import * as Joi from "joi";

export const createVoteSchema = Joi.object({
  paslonId: Joi.number().required(),
  voterName: Joi.string().required().max(50),
});
