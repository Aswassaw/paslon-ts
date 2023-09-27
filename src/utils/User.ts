import * as Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().max(50),
  vision: Joi.string().required().max(200),
  image: Joi.string().required().max(200),
});
