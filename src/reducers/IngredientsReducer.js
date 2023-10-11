import { FETCH_INGREDIENTS,LOADING_INGREDIENTS,ERROR_INGREDIENTS, FILTER_INGREDIENTS } from "../actions/actionTypes";

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
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