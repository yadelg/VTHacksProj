// src/pages/RecipePage.tsx
import { useEffect, useState } from 'react';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import './RecipePage.css';
import DetailedRecipeSideview from '../components/DetailedRecipeSideview';


function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://unproofread-unpopularized-dianne.ngrok-free.dev/recipe');
            if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
            const data = await response.json();
            console.log('Parsed data:', data);
            setRecipes(data.data);
        } catch (err) {
            console.error('Error fetching recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="recipe-grid">
            {loading && <div className="loading-overlay"><div className="spinner" /><h2>Fetching Recipes…</h2>
                <p>Please wait while we gather delicious recipes for you.</p></div>}
            {!loading &&
                recipes.map((recipe, index) => (
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
