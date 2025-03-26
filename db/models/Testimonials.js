import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import Users from "./Users.js";

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

Testimonials.belongsTo(Users, { foreignKey: "ownerId", as: "owner" });

export default Testimonials;
