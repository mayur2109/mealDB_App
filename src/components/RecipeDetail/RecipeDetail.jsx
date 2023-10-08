import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.scss';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetails(recipeId);
  }, [recipeId]);

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      } else {
        setRecipe(null);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }
  console.log(recipe);
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strYoutube,
    strSource,
    strTags,
  } = recipe;

  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }
  const steps = strInstructions.split('. ');
  return (
    <div className="recipe-detail">
        <div className="title">
            <p>Meal Details</p>
        </div>
        <hr />
        <div className="wrapper">
            <div className="recipe-detail-info">
                <img src={strMealThumb} alt={strMeal} className="recipe-image" />
                <div className="extra">
                    <h2 >{strMeal}</h2>
                    <div className="etc">
                        <p>Category: {strCategory}</p>
                        <p>Area: {strArea}</p>
                        <p>Tags: {strTags}</p>
                        <p>Source: {strSource}</p>
                    </div>
                </div>
            </div>
            <div className="quantity">
                <div className="recipe-detail-ingredients">
                    <h3>Ingredients:</h3>
                    <ul className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient} - {measures[index]}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="recipe-detail-instructions">
                <h3>Instructions:</h3>
                <ul className="instructions-list">
                    {steps.map((step, index) => (
                    <li key={index}>
                        <p><strong>Step {index + 1}:</strong> {step}</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="recipe-detail-video">
                <iframe
                width="560"
                height="400"
                src={strYoutube}
                title="YouTube video player"
                allowFullScreen
                ></iframe>
            </div>
        </div>
    </div>
  );
};

export default RecipeDetail;
