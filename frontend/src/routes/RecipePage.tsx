// src/pages/RecipePage.tsx
import React, { useEffect, useState } from 'react';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import './RecipePage.css';
import DetailedRecipeSideview from '../components/DetailedRecipeSideview';


function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);


    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8000/recipe');
            const data = await response.json();
            setRecipes(data.data);
        } catch (err) {
            console.error('Error fetching recipes:', err);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="recipe-grid">
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} onViewMore={(r) => setSelectedRecipe(r)} />
            ))}

            <DetailedRecipeSideview
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />
        </div>
    );
}

export default RecipePage;
