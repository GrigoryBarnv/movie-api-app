import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redusers/userReducer";
import movieReducer from "./redusers/movieReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer
    }
});