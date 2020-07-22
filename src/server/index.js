import {Router} from 'express';
import {AppRegistry} from 'react-native';
import reactDom from 'react-dom/server';
import {ssrUtils} from 'react-universal-ui/cli';
import {signIn, signUp} from './api/auth';
import bodyParser from 'body-parser';
//import {createUserSchema} from './utils/validationSchema';
import {signUpTeacher} from './api/sign-up.api';
import {signInTeacher, userTeacher, userStudent} from './api/sign-in.api';
import {signOutTeacher} from './api/sign-out.api';
import {signInStudent} from './api/sign-in.api';

import {
  findStudent,
  createStudent,
  listingStudent,
  updateStudent,
  deleteStudent,
} from './api/student.api';
import {
  findClass,
  createClass,
  listingClass,
  updateClass,
  deleteClass,
  generalList,
  generalListOne,
} from './api/class.api';

const router = Router();

// AppRegistry.registerComponent(cliConfigs.appJson.name, () => App);
/* Pre-render application on Node.js and send to Browser */
router.post('/api/sign-in', signIn);
router.post('/api/sign-up', signUp);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
//api login
router.post('/api/sign-up/teacher', signUpTeacher);
router.post('/api/sign-in/teacher', signInTeacher);
router.post('/api/sign-in/student', signInStudent);
router.get('/api/sign-out/teacher', signOutTeacher);
router.get('/user-teacher', userTeacher);
router.get('/user-student', userStudent);

// api teacher
router.post('/api/teacher/createClass', createClass);
router.get('/api/teacher/class', listingClass);
router.get('/api/teacher/class/:id', findClass);
router.put('/api/teacher/updateClass/:id/:field', updateClass);
router.delete('/api/teacher/deleteClass/:id', deleteClass);
router.post('/api/teacher/createStudent', createStudent);
router.get('/api/teacher/students', listingStudent);
router.get('/api/teacher/student/:id', findStudent);
router.put('/api/teacher/updateStudent/:id', updateStudent);
router.delete('/api/teacher/deleteStudent/:id', deleteStudent);

// api student
router.post('/api/createStudent', createStudent);
router.get('/api/class', listingClass);
router.get('/api/class/:id', findClass);
router.get('/api/student', listingStudent);
router.get('/api/student/:id', findStudent);
router.get('/genera', generalList);
router.get('/genera-one/:id/:classID', generalListOne);

// router.delete('/api/deleteStudent/:id', deleteStudent);
// router.put('/api/updateStudent/:id', updateStudent);


// api class
// router.get('/api/class', listingClass);
// router.get('/api/class/:id', findClass);
// router.post('/api/createClass', createClass);
// router.put('/api/updateClass/:id/:field', updateClass);
// router.delete('/api/deleteClass/:id', deleteClass);
// joint


// List ds hoc sinh trong class
// API listing class + student => them paging
// chuyen het ve tieng anh
// chuyen ve async await
// updateMany chuyen ve findOneAndUpdate

module.exports = {
  router,
  hydrate: () => ssrUtils.hydrate(AppRegistry, reactDom),
};
