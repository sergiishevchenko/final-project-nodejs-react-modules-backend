import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Ingredients = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decs: {  // Назва така ж, як у PostgreSQL
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: DataTypes.STRING
}, {
    tableName: "ingredients",
    timestamps: false,
});

// Додаємо віртуальне поле `description`, яке мапиться на `decs`
Ingredients.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.description = values.decs;  // Підставляємо `decs` як `description`
    delete values.decs;  // Прибираємо `decs` з відповіді
    return values;
};

export default Ingredients;
