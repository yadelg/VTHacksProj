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
            const text = await response.text(); // read once
            console.log('Raw response text (first 200 chars):', text.slice(0, 200));

            // Parse only if it looks like JSON
            if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
                const data = JSON.parse(text);
                console.log('Parsed data:', data);
                setRecipes(data.data);
            } else {
                console.error('Server did not return JSON, got:', text);
            }
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
