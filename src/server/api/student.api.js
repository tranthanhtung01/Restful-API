import {StudentNameModel} from '../model/student.model';
import {createStudentSchema} from '../utils/validationSchema';
import hashPassword from 'password-hash';
import {typeTeacherSchema} from '../utils/validationSchema/teacherSchema';
import {TeacherNameModel} from '../model/teacher.model';
import {ClassNameModel} from '../model/class.model';

export async function findStudent(req, res) {
  try {
    const findStudent = await StudentNameModel.findOne({_id: req.params.id});
    return res.json({
      findStudent,
      success: true,
      data: 'found a Student',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Student not found',
      message: err.message + 'findOne_Student',
    });
  }
}

export async function listingStudent(req, res) {
  try {
    const page = parseInt(req.query.page, 10),
      limit = parseInt(req.query.limit);
    if (!page || page < 1) {
      return res.status(400).json({
        success: false,
        massage: 'page number invalid ',
      });
    }

    const ListingStudentApi = await StudentNameModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (ListingStudentApi.length === 0) {
      return res.status(400).json({
        success: false,
        massage: 'null',
      });
    }
    return res.json({
      success: true,
      page: page,
      limit: limit,
      data: ListingStudentApi,
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Student not found',
      message: err.message,
    });
  }
}

export async function createStudent(req, res) {
  try {
    const {
        studentName,
        className,
        dateOfBirth,
        address,
        user,
        password,
      } = req.body,
      hash_password = hashPassword.generate(password),
      {error} = createStudentSchema.validate({
        studentName,
        className,
        dateOfBirth,
        address,
        user,
        password,
      });
    if (error) {
      res.status(400);
      return res.json({
        message: error.message,
      });
    }
    const CheckUser = req.body.user;
    const CheckUserAPI = await StudentNameModel.findOne({
      user: CheckUser,
    });
    if (CheckUserAPI) {
      res.status(400);
      return res.json({
        message: 'User already exists',
      });
    }
    {
      new StudentNameModel({
        studentName: studentName,
        className: className,
        dateOfBirth: dateOfBirth,
        address: address,
        user: user,
        password: hash_password,
      }).save();
      res.json(req.body);
      return res.json({
        success: true,
        studentName,
        className,
        dateOfBirth,
        address,
        user,
        password: hash_password,
        message: 'create success',
      });
    }
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Creating Student Failed',
      message: err.message,
    });
  }
}

export async function updateStudent(req, res) {
  try {
    const updateStudent = await StudentNameModel.updateOne(
      {_id: req.params.id},
      {
        nameStudent: req.body.nameStudent,
        className: req.body.className,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
      },
    );
    return res.json({
      updateStudent,
      success: true,
      data: 'update  Students successfully',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' update Students failed',
      message: err.message + 'update_Students',
    });
  }
}
export async function deleteStudent(req, res) {
  try {
    const deleteStudent = await StudentNameModel.deleteOne({
      _id: req.params.id,
    });
    return res.json({
      updateStudent,
      success: true,
      data: 'Successfully deleted student',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' delete Students failed',
      message: err.message + 'update_Students',
    });
  }
}
