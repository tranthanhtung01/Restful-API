import {TeacherNameModel} from '../model/teacher.model';

export async function findTeacher(req, res) {
  try {
    const foundTeacher = await TeacherNameModel.findOne({_id: req.params.id});
    return res.json({
      success: true,
      message: 'user found',
      data: foundTeacher,
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Teacher not found',
      message: err.message,
    });
  }
}

export async function listingTeacher(req, res) {
  try {
    const foundListTeacher = await TeacherNameModel.find({}).limit(10);
    return res.json({
      success: true,
      message: 'find the success listTeacher',
      data: foundListTeacher,
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Teacher list not found',
      message: err.message,
    });
  }
}

export async function updateTeacher(req, res) {
  try {
    const updateTeacherAPI = await TeacherNameModel.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
    );
    return res.json({
      success: true,
      data: 'update  Teacher successfully',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' update Teacher failed',
      message: err.message + 'update Teacher',
    });
  }
}
export async function deleteTeacher(req, res) {
  try {
    const deleteTeacherAPI = await TeacherNameModel.findOneAndDelete({
      _id: req.params.id,
    });
    return res.json({
      success: true,
      data: deleteTeacherAPI,
      message: 'delete Teacher Success',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' delete Teacher failed',
      message: err.message + 'delete Teacher',
    });
  }
}
