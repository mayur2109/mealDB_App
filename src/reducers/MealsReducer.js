import { FETCH_MEALS,LOADING_MEALS,ERROR_MEALS,SEARCH_TERM,FILTER_MEALS } from "../actions/actionTypes";

const initialState = {
    meals: [],
    filteredMeals:[],
    loading: false,
    error: null,
    searchTerm:'',
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                ...state,
                meals: action.payload,
            };
        case FILTER_MEALS:
            return{
                ...state,
                filteredMeals:action.payload,
            };
        case SEARCH_TERM:
            return {
                ...state,
                searchTerm:action.payload,
            };
        case LOADING_MEALS:
            return {
                ...state,
                loading: action.payload,
            };
        case ERROR_MEALS:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default mealsReducer;