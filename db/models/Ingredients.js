import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Ingredients = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decs: DataTypes.TEXT,
    img: DataTypes.STRING
})

// Ingredients.sync();

export default Ingredients;
