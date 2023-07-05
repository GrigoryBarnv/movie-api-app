import * as types from "../constants/ActionTypes";

const initialState = {
    user: null,
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.user,
                token: action.token
            };
        case types.ADD_FAVORITE:
            return {
                ...state,
                 user: {
                    ...state.user,
                    FavoriteMovies: [
                        ...state.user.FavoriteMovies, 
                        action.movieID
                    ]
                }
            };    
        case types.DELETE_FAVORITE:
            return {
                ...state,
                user: {
                    ...state.user,
                    FavoriteMovies: state.user.FavoriteMovies.filter(id => id !== action.movieID) 
                }
            };
        default:
            return state;
    }
};