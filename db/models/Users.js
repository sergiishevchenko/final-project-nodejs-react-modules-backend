import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex } from "../../constants/userConstants.js";

const Users = sequelize.define("user", {    // TODO
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

// Users.sync({force: true});

export default Users;
