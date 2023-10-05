import * as Joi from "joi";

export const createPartyValidation = Joi.object({
  name: Joi.string().required().max(100),
});
