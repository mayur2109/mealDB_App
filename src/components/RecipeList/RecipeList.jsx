import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { myContext } from '../../context/context';

import './RecipeList.scss';

const RecipeList = () => {
  const { ingredient } = useParams();
  const { fetchRecipesByIngredient, loading, error, recipes } = useContext(
    myContext
  );

  useEffect(() => {
    fetchRecipes();

    async function fetchRecipes() {
      try {
        await fetchRecipesByIngredient(ingredient);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  }, [ingredient, fetchRecipesByIngredient]);

  return (
    <div className="recipe-list">
      <h2 className="recipe-list-title">Recipes with {ingredient}</h2>
      {loading ? (
        <p className="recipe-list-loading">Loading recipes...</p>
      ) : error ? (
        <p className="recipe-list-error">Error loading recipes: {error}</p>
      ) : (
        <ul className="recipe-list-ul">
          {recipes.map((recipe) => (
            <li key={recipe.idMeal} className="recipe-list-item">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-list-image"
              />
              <h4 className="recipe-list-name">{recipe.strMeal}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
