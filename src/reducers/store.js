import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import MealsReducer from './MealsReducer';
import IngredientsReducer from './IngredientsReducer';
import RecipesByIngredientsReducer from './RecipesByIngredientsReducer';
import CategoriesReducer from './CategoriesReducer';
import MealDetailsReducer from './MealDetailsReducer';

const rootReducer = combineReducers({
    meals: MealsReducer,
    mealDetails:MealDetailsReducer,
    ingredients: IngredientsReducer,
    recipesByIngredients: RecipesByIngredientsReducer,
    categories: CategoriesReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;