import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Categories = sequelize.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Categories.sync();

export default Categories;