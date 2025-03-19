import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Areas = sequelize.define("area", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

// Areas.sync();

export default Areas;