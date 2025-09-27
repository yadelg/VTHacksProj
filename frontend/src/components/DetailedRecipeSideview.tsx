import React from 'react';
import { Recipe } from '../components/RecipeCard';

import './DetailedRecipeSideview.css';

interface DetailedRecipeSideviewProps {
    recipe: Recipe | null;
    onClose: () => void;
}

const DetailedRecipeSideview: React.FC<DetailedRecipeSideviewProps> = ({ recipe, onClose }) => {
    const isOpen = !!recipe;

    return (
        <>
            <div
                className={`sideview-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            <div className={`sideview ${isOpen ? 'open' : ''}`}>
                <div className="sideview-content">
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                    {recipe && (
                        <>
                            <h1>{recipe.recipe_name}</h1>
                            <h2>{recipe.origin}</h2>
                            <img src={recipe.image} alt={recipe.recipe_name} />
                            <div className="ingredients">
                                <h3>Ingredients</h3>
                                <ul>
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ingredients-section">

                                <div className="ingredients-have">
                                    <h3>What You Have</h3>
                                    <ul>
                                        {recipe.have.map((ingredient, i) => (
                                            <li key={i}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="ingredients-missing">
                                    <h3>What You're Missing</h3>
                                    <ul>
                                        {recipe.missing.map((ingredient, i) => (
                                            <li key={i}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <h3>Instructions</h3>
                            <p>{recipe.instructions}</p>
                        </>
                    )}
                </div>
            </div>
        </>

    );
};

export default DetailedRecipeSideview;
