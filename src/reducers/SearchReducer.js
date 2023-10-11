import {SEARCH_TERM } from '../actions/actionTypes'

const initialState={
    searchTerm:'',
}

const searchReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEARCH_TERM:
            return{
                ...state,
                searchTerm:action.payload,
            }
        default:
            return state;
    }
}

export default searchReducer;