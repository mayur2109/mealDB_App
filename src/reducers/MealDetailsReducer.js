import { FETCH_MEAL,LOADING_MEAL,ERROR_MEAL,CLEAR_MEAL_DETAILS } from "../actions/actionTypes";

const initialState={
    mealData:[],
    loading:false,
    error:null,
}

const MealDetailsReducer = (state=initialState,action) => {
    switch(action.type){
        case FETCH_MEAL:
            return {
                ...state,
                mealData:action.payload,
            }
        case LOADING_MEAL:
            return {
                ...state,
                loading:action.payload,
            }
        case CLEAR_MEAL_DETAILS:
            return{
                ...state,
                mealData:[],
            }
        case ERROR_MEAL:
            return {
                ...state,
                error:action.payload,
            }
        default:
            return state;
    }
}

export default MealDetailsReducer;