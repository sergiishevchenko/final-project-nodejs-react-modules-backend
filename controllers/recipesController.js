import Recipes from "../models/Recipes.js";
import Ingredients from "../models/Ingredients.js";


export async function getRecipeById(req, res, next) {
  try {
    const { id } = req.params; 
    
    const recipe = await Recipes.findByPk(id, {
      include: [
        {
          model: Ingredients,
          
          through: {
            attributes: ["measure"],
          },
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const {
      title,
      category,
      owner,
      area,
      instructions,
      description,
      thumb,
      time,
    } = recipe;

    
    const ingredients = recipe.ingredients.map((ing) => {
      return {
        name: ing.name,
        measure: ing.recipe_ingredient.measure, 
        decs: ing.decs, 
        img: ing.img,   
      };
    });

    const responseData = {
      title,
      category,
      owner,        
      area,
      instructions, 
      description,  
      thumb,        
      time,         
      ingredients,
    };

    res.json({
      status: "success",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
}
