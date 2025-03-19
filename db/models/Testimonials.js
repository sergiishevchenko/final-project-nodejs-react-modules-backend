import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Testimonials = sequelize.define("testimonial", {
    testimonial: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

// Testimonials.sync();

export default Testimonials;
