import { FETCH_MEALS,LOADING_MEALS,ERROR_MEALS } from "../actions/actionTypes";

const initialState = {
    meals: [],
    loading: false,
    error: null,
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                ...state,
                meals: action.payload,
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