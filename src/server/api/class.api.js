import {ClassNameModel} from '../model/class.model';
import {createClassSchema} from '../utils/validationSchema';
import {StudentNameModel} from '../model/student.model';

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
    const page = parseInt(req.query.page, 10),
      limit = parseInt(req.query.limit);
    if (!page || page < 1) {
      return res.status(400).json({
        success: false,
        massage: 'page number invalid ',
      });
    }

    const ListingClassApi = await ClassNameModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (ListingClassApi.length === 0) {
      return res.status(400).json({
        success: false,
        massage: 'null',
      });
    }
    return res.json({
      success: true,
      page: page,
      limit: limit,
      data: ListingClassApi,
    });
  } catch (err) {
    res.status(400);
    return res.json({
      success: false,
      data: 'Class not found',
      message: err.message,
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
    const updateClass = await ClassNameModel.updateOne(
      {_id: req.params.id},
      {
        className: req.body.className,
        numberOfStudent: req.body.numberOfStudent,
        Student: req.body.Student,
      },
    );
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
    const CheckNumberStudent = await ClassNameModel.find({});
    if (CheckNumberStudent != null) {
      res.status(400);
      return res.json({
        message: 'You need to delete all students first',
      });
    }
    {
      const deleteClass = await ClassNameModel.deleteOne({
        _id: req.params.id,
      });
      {
        return res.json({
          updateClass,
          success: true,
          data: 'Successfully deleted class',
        });
      }
    }
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
    const generalListOne = await StudentNameModel.findOne({
      _id: req.params.classID,
      Student: req.params.id,
    }).populate('className');
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
