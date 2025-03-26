import { Model } from "sequelize";
import Testimonials from "../db/models/Testimonials.js";
import Users from "../db/models/Users.js";

async function getAllTestimonials(page, limit) {

    const rows = await Testimonials.findAll({
        offset: (page - 1) * limit,
        limit: limit,
        order: [['id', 'DESC']],
        include: [
            {
                model: Users,
                as: "owner",
                attributes: ["name"],
            }
        ]
    });

    const count = await Testimonials.count();

    return {rows, count}
}

export default getAllTestimonials;
