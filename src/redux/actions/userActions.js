import * as types from "../constants/ActionTypes";

export const setUser = (user, token) => ({
    type: types.SET_USER,
    user,
    token
});

export const addFavorite = movieID => ({
    type: types.ADD_FAVORITE,
    movieID
});

export const deleteFavorite = movieID => ({
    type: types.DELETE_FAVORITE,
    movieID
});