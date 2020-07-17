import mongoose from 'mongoose';

const classSchema = mongoose.Schema(
  {
    className: String,
    numberOfStudent: String,
    Student: {
      type: String,
      ref: 'Student',
    },
  },
  {collection: 'className'},
);
export const ClassNameModel = mongoose.model('className', classSchema);
