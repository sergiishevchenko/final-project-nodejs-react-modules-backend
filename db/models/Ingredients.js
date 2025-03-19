import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Ingredients = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: DataTypes.TEXT,
    img: DataTypes.STRING
})

// Ingredients.sync();

export default Ingredients;