import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex } from "../../constants/userConstants.js";

/**
 * Cascade (belongsTo) was not added for all entities belonging to User, since user deletion functionality is not part of the requirements
 */
const Users = sequelize.define("user", { 
    id: { //please generate uuid when creating the user, type string was set for the compatibility with the data document
        type: DataTypes.STRING,
        primaryKey: true,
    },
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

// Users.sync();

export default Users;
