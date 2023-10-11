import { FETCH_CATEGORIES,LOADING_CATEGORIES,ERROR_CATEGORIES } from "../actions/actionTypes";

const initialState={
    categories:[],
    loading:false,
    error:null,
}

const categoriesReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_CATEGORIES:
            return{
                ...state,
                categories:action.payload,
            }
        case LOADING_CATEGORIES:
            return{
                ...state,
                loading:action.payload,
            }
        case ERROR_CATEGORIES:
            return{
                ...state,
                error:action.payload,
            }
        default:
            return state;
    }
}

export default categoriesReducer;