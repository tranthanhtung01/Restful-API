import {StudentNameModel} from '../model/student.model';
import {createStudentSchema} from '../utils/validationSchema';

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
    const listingStudent = await StudentNameModel.find({});
    return res.json({
      listingStudent,
      success: true,
      data: 'found all Student',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Student not found',
      message: err.message + 'find_Students',
    });
  }
}

export async function createStudent(req, res) {
  const {nameStudent, className, dateOfBirth, address} = req.body,
    {error} = createStudentSchema.validate({
      nameStudent,
      className,
      dateOfBirth,
      address,
    });
  if (error) {
    res.status(400);
    return res.json({
      message: error.message,
    });
  } else {
    new StudentNameModel({
      nameStudent: nameStudent,
      className: className,
      dateOfBirth: dateOfBirth,
      address: address,
    }).save();
    res.json(req.body);
    return res.json({
      message: 'create success',
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
