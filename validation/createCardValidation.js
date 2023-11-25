import Joi from "joi";
import validation from "./validation";

const createSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  web: Joi.string().min(14),
  url: Joi.string().min(14),
  alt: Joi.string().min(2).max(256),
  state: Joi.string(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
  zip: Joi.string().required(),
});

const validateCreateCard = (inputToCheck) =>
  validation(createSchema, inputToCheck);

export { validateCreateCard };
