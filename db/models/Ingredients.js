import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Ingredients = sequelize.define("ingredient", {
    id: { //please generate uuid when creating the ingredient, type string was set for the compatibility with the data document
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decs: DataTypes.TEXT,
    img: DataTypes.STRING
})

// Ingredients.sync();

export default Ingredients;
