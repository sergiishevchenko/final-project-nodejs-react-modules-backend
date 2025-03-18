import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Testimonials = sequelize.define("testimonial", {
    testimonial: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// Testimonials.sync();

export default Testimonials;
