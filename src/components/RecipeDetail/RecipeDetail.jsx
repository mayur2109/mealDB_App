import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {CLEAR_MEAL_DETAILS} from '../../actions/actionTypes';
import {fetchMealDetails} from '../../actions/index'
import { ErrorPage,Loader } from '../../utils';
import './RecipeDetail.scss';

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const {mealData,loading,error} = useSelector(state => state.mealDetails);
  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(fetchMealDetails(recipeId));
    return()=>{
      dispatch({type:CLEAR_MEAL_DETAILS})
    }
  }, [dispatch,recipeId]);


  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPage
        errorMessage={`Error loading ingredients: ${error}`}
        onRetryClick={() => fetchMealDetails()}
      />
    );
  }

  const videoId = mealData.strYoutube?.split('v=')[1];
  const embeddedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strSource,
    strTags,
  } = mealData;

  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }
  const steps = strInstructions?.split('. ');
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
                        <p>Source: <a href={strSource} target="_blank" rel="noopener noreferrer">{strSource}</a></p>
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
                    {steps?.map((step, index) => (
                    <li key={index}>
                        <p><strong>Step {index + 1}:</strong> {step}</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="recipe-detail-video">
                <iframe
                  width="400"
                  height="560"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  src={embeddedUrl}
                  title="YouTube video player"
                />
            </div>
        </div>
    </div>
  );
};

export default RecipeDetail;
