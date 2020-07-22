import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema(
  {
    teacherName: String,
    specialized: String,
    address: String,
    auth: {
      email: String,
      password: String,
    },
  },
  {collection: 'teacher'},
);

export const TeacherNameModel = mongoose.model('teacher', teacherSchema);
