import JoiOriginal from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiOriginal.extend(JoiDate);

export const typeTeacherSchema = Joi.object({
  teacherName: Joi.string()
    .regex(/^[\D]+$/)
    .min(6)
    .max(40)
    .required(),
  specialized: Joi.string().required(),
  address: Joi.string().required(),
  auth: {
    email: Joi.string()
      .regex(/^[\D][a-z0-9]{5,32}@[gemail]{2,5}(\.[com]{2,4})$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .min(6)
      .max(30)
      .required(),
  },
});
