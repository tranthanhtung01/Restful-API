import JoiOriginal from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiOriginal.extend(JoiDate);

export const createClassSchema = Joi.object({
  className: Joi.string().required(),
  numberOfStudent: Joi.string().required(),
});
