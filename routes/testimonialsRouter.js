import express from "express";

import { getTestimonials } from "../controllers/testimonialsControllers.js";
import { getTestimonialsSchema } from "../schemas/testimonialsSchemas.js";
import validateQuery from "../helpers/validateQuery.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const testimonialsRouter = express.Router();

testimonialsRouter.get("/", validateQuery(getTestimonialsSchema), ctrlWrapper(getTestimonials));

export default testimonialsRouter;
