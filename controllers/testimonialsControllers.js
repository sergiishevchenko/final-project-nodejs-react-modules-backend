import getAllTestimonials from "../services/testimonialsServices.js";

export const getTestimonials = async (req, res, next) => {
    try {
        const { page = 1, limit = 3 } = req.query;
        const { rows, count } = await getAllTestimonials(page, limit);
        res.json({ total: count, testimonials: rows });
    } catch (error) {
        next(error);
    }
};
