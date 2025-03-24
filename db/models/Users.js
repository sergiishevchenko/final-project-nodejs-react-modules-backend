import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex } from "../../constants/userConstants.js";
import Recipes from "./Recipes.js";

/**
 * Cascade (belongsTo) was not added for all entities belonging to User, since user deletion functionality is not part of the requirements
 */
const Users = sequelize.define("user", { 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        match: emailRegex,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },

})

Users.hasMany(Recipes, { foreignKey: "ownerId", as: "recipes" });

// Users.sync();

export default Users;
