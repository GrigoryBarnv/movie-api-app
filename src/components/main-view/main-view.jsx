import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Container, Row } from "react-bootstrap";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { setMovies } from "../../redux/actions/movieActions";
import { localMovies } from "../../data/local-movies";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);
  const token = useSelector((state) => state.user.token);
  const searchFilter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes((searchFilter || "").toLowerCase())
  );

  useEffect(() => {
    if (storedUser && storedToken) {
      dispatch(setUser(storedUser, storedToken));
    }
  }, [dispatch, storedToken, storedUser]);

  useEffect(() => {
    if (!token) {
      dispatch(setMovies(localMovies));
      return;
    }

    fetch("https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death
          },
          id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        }));

        dispatch(setMovies(moviesFromApi));
      })
      .catch(() => {
        dispatch(setMovies(localMovies));
      });
  }, [token, dispatch]);

  return (
    <HashRouter>
      <div className="main-container">
        <Container>
          <NavigationBar />
          <Routes>
            <Route
              path="/signup"
              element={
                <Row className="justify-content-center">
                  {token ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </Row>
              }
            />
            <Route
              path="/login"
              element={
                <Row className="justify-content-center">
                  {token ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView />
                    </Col>
                  )}
                </Row>
              }
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={12}>
                    <ProfileView />
                  </Col>
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={movies.length === 0 ? <div>Loading...</div> : <MovieView />}
            />
            <Route
              path="/"
              element={
                movies.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <div className="movie-list">
                    {movies.map((movie) => (
                      <MovieCard movie={movie} key={movie.id} />
                    ))}
                  </div>
                )
              }
            />
            <Route
              path="/search"
              element={
                filteredMovies.length === 0 ? (
                  <div>Nothing found!</div>
                ) : (
                  <div className="movie-list">
                    {filteredMovies.map((movie) => (
                      <MovieCard movie={movie} key={movie.id} />
                    ))}
                  </div>
                )
              }
            />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  );
};
