import { FILTER_INGREDIENTS } from "../actions/actionTypes";

const initialState={
    filteredIngredients:[],
}

export const filterIngredientsReducer = (state=initialState, action) => {
    switch (action.type) {
        case FILTER_INGREDIENTS:
            return{
                ...state,
                filteredIngredients:action.payload,
            }
        default:
            return state;
    }
}

export default filterIngredientsReducer;