import {ClassNameModel} from '../model/class.model';
import {createClassSchema} from '../utils/validationSchema';

export async function findClass(req, res) {
  try {
    const findClass = await ClassNameModel.findOne({_id: req.params.id});
    return res.json({
      findClass,
      success: true,
      data: 'found a Class',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Class not found',
      message: err.message + 'findOne_Class',
    });
  }
}

export async function listingClass(req, res) {
  try {
    const listingClass = await ClassNameModel.find({});
    return res.json({
      listingClass,
      success: true,
      data: 'found all Class',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Class not found',
      message: err.message + 'find_Class',
    });
  }
}

export async function createClass(req, res) {
  const {className, numberOfStudent, Student} = req.body,
    {error} = createClassSchema.validate({
      className,
      numberOfStudent,
    });
  if (error) {
    res.status(400);
    return res.json({
      message: error.message,
    });
  }
  new ClassNameModel({
    className: className,
    numberOfStudent: numberOfStudent,
  }).save();
  res.json(req.body);
}

export async function updateClass(req, res) {
  try {
    const updateClass = await ClassNameModel.updateOne({_id: req.params.id});
    return res.json({
      updateClass,
      success: true,
      data: 'update  Class successfully',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' update Class failed',
      message: err.message + 'update_Class',
    });
  }
}
export async function deleteClass(req, res) {
  try {
    const deleteClass = await ClassNameModel.deleteOne({
      _id: req.params.id,
    });
    return res.json({
      updateClass,
      success: true,
      data: 'Successfully deleted class',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: ' delete class failed',
      message: err.message + 'update_class',
    });
  }
}
export async function generalList(req, res) {
  try {
    const generalList = await ClassNameModel.find({}).populate('Student');
    return res.json({
      generalList,
      success: true,
      data: 'found all Class',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Class not found',
      message: err.message + 'find_Class',
    });
  }
}
export async function generalListOne(req, res) {
  try {
    const generalListOne = await ClassNameModel.findOne({
      _id: req.params.classID,
      Student: req.params.id,
    }).populate('Student');
    return res.json({
      generalListOne,
      success: true,
      data: 'found a Student in Class',
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Class not found',
      message: err.message + 'find_Class',
    });
  }
}
