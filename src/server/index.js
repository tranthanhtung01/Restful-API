import {Router} from 'express';
import {AppRegistry} from 'react-native';
import reactDom from 'react-dom/server';
import {ssrUtils} from 'react-universal-ui/cli';
import {signIn, signUp} from './api/auth';
import bodyParser from 'body-parser';
//import {createUserSchema} from './utils/validationSchema';
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

// api student
router.get('/api/student', listingStudent);
router.get('/api/student/:id', findStudent);
router.post('/api/createStudent', createStudent);
router.put('/api/updateStudent/:id', updateStudent);
router.delete('/api/deleteStudent/:id', deleteStudent);
// api class
router.get('/api/class', listingClass);
router.get('/api/class/:id', findClass);
router.post('/api/createClass', createClass);
router.put('/api/updateClass/:id/:field', updateClass);
router.delete('/api/deleteClass/:id', deleteClass);
// joint
router.get('/api/joint', generalList);
router.get('/api/joint-one/:id/:classID', generalListOne);

// List ds hoc sinh trong class
// API listing class + student => them paging
// chuyen het ve tieng anh
// chuyen ve async await
// updateMany chuyen ve findOneAndUpdate

module.exports = {
  router,
  hydrate: () => ssrUtils.hydrate(AppRegistry, reactDom),
};
