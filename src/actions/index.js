import * as actionTypes from './actionTypes'
import axios from 'axios';

//MEALS

export const fetchMeals = (searchTerm) => {
    return(dispatch=>{
        dispatch(loadingMeals(true));
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((res) => {
            dispatch({
                type: actionTypes.FETCH_MEALS,
                payload: res.data.meals,
            });
        })
        .catch((err) => {
            dispatch(errorMeals(err.message));
        })
        .finally(() => {
            dispatch(loadingMeals(false));
        });
    })
}

export const loadingMeals = () => {
  return {
    type: actionTypes.LOADING_MEALS,
  };
}

export const errorMeals = (error) => {
    return {
        type: actionTypes.ERROR_MEALS,
        payload: error,
    };
}

//MEAL

export const fetchMealDetails = (id) => {
    return(dispatch=>{
        dispatch(loadingMeal(true));
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
            dispatch({
                type:actionTypes.FETCH_MEAL,
                payload:res.data.meals[0],
            });
        })
        .catch((err) => {
            dispatch(errorMeal(err.message));
        })
        .finally(() => {
            dispatch(loadingMeal(false));
        });
    })
}

export const loadingMeal = () => {
    return {
        type: actionTypes.LOADING_MEAL,
    };
}

export const errorMeal = () =>{
    return {
        type: actionTypes.ERROR_MEAL,
    };
}


//INGREDIENTS

export const fetchIngredients = () => {
    return(dispatch=>{
        dispatch(loadingIngredients(true));
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        .then((res) => {
            dispatch({
                type:actionTypes.FETCH_INGREDIENTS,
                payload:res.data.meals,
            });
        })
        .catch((err) => {
            dispatch(errorIngredients(err.message));
        })
        .finally(() => {
            dispatch(loadingIngredients(false));
        });
    })
}

export const loadingIngredients = () => {
    return {
        type: actionTypes.LOADING_INGREDIENTS,
    };
}

export const errorIngredients = (error) => {
    return {
        type: actionTypes.ERROR_INGREDIENTS,
        payload: error,
    };
}

//RECIPE BY INGREDIENT

export const fetchRecipesByIngredient = (ingredient) => {
    return(dispatch=>{
        dispatch(loadingrecipesByIngredient(true));
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((res) => {
            dispatch({
                type:actionTypes.FETCH_RECIPES_BY_INGREDIENT,
                payload:res.data.meals,
            });
        })
        .catch((err)=>{
            dispatch(errorRecipesByIngredient(err.message));
        })
        .finally(()=>{
            dispatch(loadingrecipesByIngredient(false));
        })
    })
}

export const loadingrecipesByIngredient = () => {
    return{
        type:actionTypes.LOADING_RECIPES_BY_INGREDIENT,
    }
}

export const errorRecipesByIngredient = (error) => {
    return{
        type:actionTypes.ERROR_RECIPES_BY_INGREDIENT,
        payload:error,
    }
}

//CATEGORIES

export const fetchCategories = () => {
    return(dispatch=>{
        dispatch(loadingCategories(true));
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then((res) => {
            dispatch({
                type:actionTypes.FETCH_CATEGORIES,
                payload:res.data.categories,
            });
        })
        .catch((err)=>{
            dispatch(errorCategories(err.message));
        })
        .finally(()=>{
            dispatch(loadingCategories(false));
        })
    })
}

export const loadingCategories = () => {
    return{
        type:actionTypes.LOADING_CATEGORIES,
    }
}

export const errorCategories = (error) => {
    return{
        type:actionTypes.ERROR_CATEGORIES,
        payload:error,
    }
}

//SEARCH TERM

export const searchTerm = (term) => {
    return{
        type:actionTypes.SEARCH_TERM,
        payload:term,
    }
}

//FILTER INGREDIENTS

export const filterIngredients = (term,oldData) => {
    return dispatch=>{
        if (!term){
            dispatch({
                type:actionTypes.FILTER_INGREDIENTS,
                payload:oldData,
            })
        }dispatch({
            type:actionTypes.FILTER_INGREDIENTS,
            payload:oldData.filter((ingredient) =>
            ingredient.strIngredient.toLowerCase().includes(term.toLowerCase())
            ),
        })
    }
}
