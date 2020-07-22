import {TeacherNameModel} from '../model/teacher.model';
import {typeTeacherSchema} from '../utils/validationSchema/teacherSchema';
import hashPassword from 'password-hash';

export async function signUpTeacher(req, res) {
  try {
    const {
        teacherName,
        specialized,
        address,
        auth: {email, password},
      } = req.body,
      hash_password = hashPassword.generate(password),
      {error} = await typeTeacherSchema.validate({
        teacherName,
        specialized,
        address,
        auth: {
          email,
          password,
        },
      });
    if (error) {
      res.status(400);
      return res.json({
        message: error.message,
      });
    }
    const Email = req.body.auth.email;
    console.log(Email);
    const checkEmail = await TeacherNameModel.findOne({
      'auth.email': Email,
    });
    if (checkEmail) {
      res.status(400);
      return res.json({
        message: 'email already exists',
      });
    }
    {
      new TeacherNameModel({
        teacherName: teacherName,
        specialized: specialized,
        address: address,
        auth: {
          email: email,
          password: hash_password,
        },
      }).save();
      res.json(req.body);
      return res.json({
        success: true,
        teacherName,
        specialized,
        address,
        auth: {
          email,
          password,
        },
        message: 'create success',
      });
    }
  } catch (err) {
    res.status(500);
    return res.json({
      success: false,
      data: 'Creating Teacher Failed',
      message: err.message,
    });
  }
}
