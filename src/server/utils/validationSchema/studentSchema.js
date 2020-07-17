import JoiOriginal from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiOriginal.extend(JoiDate);

export const createStudentSchema = Joi.object({
  nameStudent: Joi.string()
    .regex(/^[\D]+$/)
    .uppercase(),
  className: Joi.string().required(),
  dateOfBirth: Joi.date().format('DD/MM/YYYY'),
  address: Joi.string().required(),
});
