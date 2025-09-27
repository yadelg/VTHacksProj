import { useState, useContext, useEffect, createContext } from 'react'
import './RecipeCard.css';

interface Recipe {
  recipe_name: string,
  origin: string,
  ingredients: string[],
  image: string
}

const RecipeContext = createContext({
  recipes: [], fetchRecipes: () => {}
})

export default function RecipeCard() {
    const [recipes, setRecipes] = useState([])
    const fetchRecipes = async () => {
        const response = await fetch("http://localhost:8000/recipe")
        const recipes = await response.json()
        setRecipes(recipes.data)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <RecipeContext.Provider value={{ recipes, fetchRecipes }}>
            <div className="recipe-grid">
            {recipes.map((recipe: Recipe, index) => (
                <div className="recipe-card" key={index}>
                <h1>{recipe.recipe_name}</h1>
                <h2>{recipe.origin}</h2>
                <ul>
                    {recipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i}>{ingredient}</li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </RecipeContext.Provider>
    );


}