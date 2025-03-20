import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import Categories from "./Categories.js";
import Areas from "./Areas.js";

const Recipes = sequelize.define("recipe", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    areaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    thumb: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    favoriteCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

Recipes.belongsTo(Categories, { foreignKey: "categoryId", as: "category" });
Recipes.belongsTo(Areas, { foreignKey: "areaId", as: "area" });

// Recipes.sync();

export default Recipes;