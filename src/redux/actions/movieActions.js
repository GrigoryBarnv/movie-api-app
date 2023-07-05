import * as types from "../constants/ActionTypes"

export const setMovies = (movies) => ({
    type: types.SET_MOVIES,
    movies
});

export const setFilter = (filter) => ({
    type: types.SET_FILTER,
    filter
})

