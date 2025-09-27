import { useState, useContext, useEffect, createContext } from 'react'

interface Recipe {
  recipe_name: string,
  origin: string,
  ingredients: string[]
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
    <RecipeContext.Provider value={{recipes, fetchRecipes}}>
      <p>
        {
          recipes.map((recipe: Recipe) => (
            <p>{recipe.recipe_name}</p>
          ))
        }
      </p>
    </RecipeContext.Provider>
  )

}