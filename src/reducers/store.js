import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import MealsReducer from './MealsReducer';
import IngredientsReducer from './IngredientsReducer';
import RecipesByIngredientsReducer from './RecipesByIngredientsReducer';
import CategoriesReducer from './CategoriesReducer';
import MealDetailsReducer from './MealDetailsReducer';
import searchReducer from './SearchReducer';
import filterIngredientsReducer from './FilterIngredients';

const rootReducer = combineReducers({
    meals: MealsReducer,
    mealDetails:MealDetailsReducer,
    ingredients: IngredientsReducer,
    recipesByIngredients: RecipesByIngredientsReducer,
    categories: CategoriesReducer,
    search:searchReducer,
    filter:filterIngredientsReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;