import Joi from "joi";

export const recipeSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    instructions: Joi.string().required(),
    time: Joi.number().integer().min(1).required(),
    categoryId: Joi.number().integer().required(),
    areaId: Joi.number().integer().required(),
    thumb: Joi.string().optional(),
    ingredients: Joi.alternatives().try(
        Joi.array().items(
            Joi.object({
                id: Joi.number().integer().required(),
                measure: Joi.string().allow('').optional()
            })
        ).min(1).required(),
        Joi.string().required()
    )
});