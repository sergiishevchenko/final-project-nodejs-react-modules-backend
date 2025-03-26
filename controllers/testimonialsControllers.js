import getAllTestimonials from "../services/testimonialsServices.js";

export const getTestimonials = async (req, res, next) => {
        const { page = 1, limit = 3 } = req.query;
        const { rows, count } = await getAllTestimonials(page, limit);
        res.json({
                total: count, testimonials: rows.map((row) => ({
                        id: row.id,
                        testimonial: row.testimonial,
                        owner: row.owner.name,
                }))
        })                
};
