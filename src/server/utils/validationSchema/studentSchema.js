import JoiOriginal from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiOriginal.extend(JoiDate);

export const createStudentSchema = Joi.object({
  studentName: Joi.string()
    .regex(/^[\D]+$/)
    .required(),
  className: Joi.string()
    .regex(/^[A-Z0-9]+$/)
    .min(3)
    .max(20)
    .required(),
  dateOfBirth: Joi.date().format('DD/MM/YYYY'),
  address: Joi.string().required(),
  user: Joi.string()
    .regex(/^[a-zA-Z0-9]+$/)
    .min(5)
    .max(20)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]+$/)
    .min(5)
    .max(20)
    .required(),
});
