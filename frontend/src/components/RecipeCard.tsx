// src/components/RecipeCard.tsx
import React from 'react';
import './RecipeCard.css';

export interface Recipe {
    recipe_name: string;
    origin: string;
    ingredients: string[];
    missing: string[],
    have: string[],
    image: string,
    instructions: string;
}

interface RecipeCardProps {
    recipe: Recipe;
    onViewMore: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewMore }) => {
    return (
        <div className="recipe-card">
            <h1>{recipe.recipe_name}</h1>
            <h2>{recipe.origin}</h2>

            <div className="recipe-image-wrapper">
                <img src={recipe.image} alt={recipe.recipe_name} />
            </div>

            <ul>
                {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                ))}
            </ul>
            <div className="recipe-card-footer">
                <button className="view-more-btn" onClick={() => onViewMore(recipe)}>View More</button>
            </div>
        </div>
    );
};

export default RecipeCard;
