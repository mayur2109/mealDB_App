import React, {  useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import {fetchRecipesByIngredient} from '../../actions/index';
import Loader from "../../utils/Loader/Loader"
import ErrorPage from "../../utils/Error/ErrorPage"

import './RecipeList.scss';

const RecipeList = () => {
  const { ingredient } = useParams();

  const dispatch = useDispatch();
  const {recipeData,loading,error,} = useSelector((state) => state.recipesByIngredients);

  useEffect(() => {
    dispatch(fetchRecipesByIngredient(ingredient))
  }, [dispatch,ingredient]);

  return (
    <div className="recipe-list">
      <h2 className="recipe-list-title">Recipes with {ingredient}</h2>
      {loading ? (
        <Loader/>
      ) : error ? (
        <ErrorPage
        errorMessage={`Error loading Recipes for ${ingredient}: ${error}`}
        onRetryClick={() => fetchRecipesByIngredient()}/>
      ) : (
        <ul className="recipe-list-ul">
          {recipeData.map((recipe) => (
            <Link
              to={`/recipe/${recipe.idMeal}`}
              key={recipe.idMeal}
              className="custom-link"
            >
              <li>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="recipe-list-image"
                />
                <h4 className="recipe-list-name">{recipe.strMeal}</h4>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
