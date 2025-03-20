import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Ingredients = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: DataTypes.STRING
}, {
    tableName: "ingredients",
    timestamps: false,
});

Ingredients.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.description = values.desc;
    delete values.desc;
    return values;
};

export default Ingredients;