import Joi from "joi";
import { emailRegex } from "../constants/userConstants.js";

export const createUserSchema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

export const loginUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

export const followUserSchema = Joi.object({
    userId: Joi.number().integer().positive().required().options({ convert: false })
});

export const unfollowUserSchema = Joi.object({
    userId: Joi.number().integer().positive().required().options({ convert: false })
});