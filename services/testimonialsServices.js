import Testimonials from "../db/models/Testimonials.js";
import Users from "../db/models/Users.js";

async function getAllTestimonials(page, limit) {

    const rows = await Testimonials.findAll({
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'name', "avatar"]
            }
        ],
        offset: (page - 1) * limit,
        limit: limit,
        order: [['id', 'DESC']],
    });

    const count = await Testimonials.count();

    return {rows, count}

}

export default getAllTestimonials;