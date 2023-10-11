import { FETCH_RECIPES_BY_INGREDIENT,LOADING_RECIPES_BY_INGREDIENT,ERROR_RECIPES_BY_INGREDIENT } from "../actions/actionTypes";

const initialState={
    recipeData:[],
    loading:false,
    error:null,
}

const recipesByIngredientReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES_BY_INGREDIENT:
            return{
                ...state,
                recipeData:action.payload,
            }
        case LOADING_RECIPES_BY_INGREDIENT:
            return{
                ...state,
                loading:action.payload,
            }
        case ERROR_RECIPES_BY_INGREDIENT:
            return{
                ...state,
                error:action.payload,
            }
        default:
            return state;
    }
}

export default recipesByIngredientReducer;