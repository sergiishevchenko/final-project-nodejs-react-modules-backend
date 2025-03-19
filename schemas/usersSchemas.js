import Joi from "joi";

export const followUserSchema = Joi.object({
    userId: Joi.number().integer().positive().required().options({ convert: false })
});