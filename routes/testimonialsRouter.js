import express from "express";

import { getTestimonials } from "../controllers/testimonialsControllers.js";
import { getTestimonialsSchema } from "../schemas/testimonialsSchemas.js";
import validateQuery from "../helpers/validateQuery.js";

const testimonialsRouter = express.Router();

testimonialsRouter.get("/", validateQuery(getTestimonialsSchema), getTestimonials);

export default router;