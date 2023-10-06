import * as Joi from "joi";

export const createPaslonSchema = Joi.object({
  name: Joi.string().required().max(50),
  vision: Joi.string().required().max(200),
  party: Joi.array().required(),
});

export const updatePaslonSchema = Joi.object({
  name: Joi.string().required().max(50),
  vision: Joi.string().required().max(200),
});
