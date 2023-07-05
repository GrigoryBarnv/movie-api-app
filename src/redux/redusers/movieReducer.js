import * as types from "../constants/ActionTypes";

const initialState = {
    movies: [],
    filter: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MOVIES: 
            return {
                ...state,
                movies: action.movies
            };
        case types.SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
};