import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/StudentManage', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connect success mongoDB...'))
  .catch((err) => console.log('connect fail ', err));
