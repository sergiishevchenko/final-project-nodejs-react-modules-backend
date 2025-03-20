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

// Додаємо віртуальне поле `description`, яке мапиться на `desc`
Ingredients.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.description = values.desc;  // Підставляємо `desc` як `description`
    delete values.desc;  // Прибираємо `desc` з відповіді
    return values;
};

export default Ingredients;
