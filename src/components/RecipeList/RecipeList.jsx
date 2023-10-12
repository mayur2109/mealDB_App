import React, {  useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import {fetchRecipesByIngredient} from '../../actions/index';
import { Card,Loader,ErrorPage } from '../../utils';

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
        <div className="recipe-list-grid">
          {recipeData.map((recipe) => (
            <Link
              to={`/recipe/${recipe.idMeal}`}
              key={recipe.idMeal}
              className="custom-link"
            >
              <Card
                key={recipe.idMeal}
                image={recipe.strMealThumb}
                name={recipe.strMeal}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
