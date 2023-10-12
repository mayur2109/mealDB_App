import { FETCH_INGREDIENTS,LOADING_INGREDIENTS,ERROR_INGREDIENTS, FILTER_INGREDIENTS,SEARCH_TERM } from "../actions/actionTypes";

const initialState = {
    ingredients: [],
    filteredIngredients:[],
    loading: false,
    error: null,
    searchTerm:'',
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
            }
        case FILTER_INGREDIENTS:
            return{
                ...state,
                filteredIngredients:action.payload,
            }
        case SEARCH_TERM:
                return{
                    ...state,
                    searchTerm:action.payload,
                }
        case LOADING_INGREDIENTS:
            return {
                ...state,
                loading: action.payload,
            }
        case ERROR_INGREDIENTS:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default ingredientsReducer;