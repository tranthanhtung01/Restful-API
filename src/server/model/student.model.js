import mongoose from 'mongoose';

const studentSchema = mongoose.Schema(
  {
    nameStudent: String,
    className: String,
    dateOfBirth: String,
    address: String,
  },
  {collection: 'Student'},
);
export const StudentNameModel = mongoose.model('Student', studentSchema);
