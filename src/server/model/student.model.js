import mongoose from 'mongoose';
const studentSchema = mongoose.Schema(
  {
    studentName: String,
    className: String,
    dateOfBirth: String,
    address: String,
    user: String,
    password: String,
    role: {
      type: String,
      default: 'user',
    },
    // roles: 'user  ',
    // allows: [
    //   {
    //     resources: '/posts',
    //     permissions: 'post,get',
    //   },
    // ],
  },
  {collection: 'Student'},
);
export const StudentNameModel = mongoose.model('Student', studentSchema);
