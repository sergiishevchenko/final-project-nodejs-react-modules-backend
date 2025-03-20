import sequelize from '../sequelize.js';
import { DataTypes } from 'sequelize';
import Users from './Users.js';
import Recipes from './Recipes.js';

const FavoriteRecipes = sequelize.define('favorite_recipe', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Recipes,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

FavoriteRecipes.belongsTo(Recipes, { foreignKey: 'recipeId' });
FavoriteRecipes.belongsTo(Users, { foreignKey: 'userId' });

export default FavoriteRecipes;
