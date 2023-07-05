import { useParams } from "react-router";
import { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view"
import { addFavorite, deleteFavorite } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

// Component to populate movie card
export const MovieView = () => {

    const user = useSelector(state => state.user.user);
    const movies = useSelector(state => state.movies.movies);
    const { movieId } = useParams();
    const token = localStorage.getItem("token");
    const [errors, setErrors] = useState([]);
    const movie = movies.find((m) => m.id === movieId);
    const similarMovies = movies.filter((m => m.Genre.Name === movie.Genre.Name && m.Title !== movie.Title));
    const dispatch = useDispatch();

    let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

    const handleAddFavorite = () => {
        fetch(`https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                alert("Movie added to favorites");
                localStorage.setItem("user", JSON.stringify(data));           
                //console.log('Before dispatch:', addFavorite(movie.id));
                dispatch(addFavorite(movie.id));
                //console.log('After dispatch:', addFavorite(movie.id));
            } else {
                alert("Failed to update user");
                setErrors(err.errors);
                console.log(errors);
            }
        })
        .catch(err => {
            alert("Something went wrong");
        });
      };
    
      const handleRemoveFavorite = () => {
        fetch(`https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                alert("Movie removed from favorites");
                localStorage.setItem("user", JSON.stringify(data));
                dispatch(deleteFavorite(movie.id));
            } else {
                alert("Failed to update user");
                setErrors(err.errors);
                console.log(errors);
            }
        })
        .catch(err => {
            alert("Something went wrong");
        });
      };

    return (
        <div className="flex">
            <div className="movie-view-description">
                <div>
                    <h3 className="my-0">
                        <span>Title: </span>
                        <span>{movie.Title}</span>
                    </h3>
                    <h5 className="mt-1 text-left text-muted">
                        <span>Director: </span>
                        <span>{movie.Director.Name}</span>
                    </h5>
                    <div className="align-self-end mb-2 text-end">
                        <span>Genre: </span>
                        <span className="fw-bolder">{movie.Genre.Name}</span>
                    </div>
                    <div className="mt-md-5 mb-4">
                        <div className="text-decoration-underline mb-2">Description: </div>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-auto mb-md-4">
                        <div>
                            {
                                user.FavoriteMovies.includes(movie.id) ? 
                                    <div>
                                        <h3>Currently in favorites</h3>
                                        <Button variant="danger" onClick={handleRemoveFavorite}>Remove</Button> 
                                    </div>
                                    
                                    : 
                                    <div>
                                        <h3>Add to favorites</h3>
                                        <Button className="button-add-favorite" onClick={handleAddFavorite}>Add</Button> 
                                    </div>
                                }
                        </div>
                        <div className="ml-auto align-self-end">
                            <Link to={`/`}>
                                <Button className="back-button">Return</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <img 
                    src={movie.ImagePath} 
                    alt={`Poster for ${movie.Title}`} 
                    className="movie-view-img p-3"
                />
            </div>
        
        {similarMovies.length > 0 && (
            <div>
                <h3 className="mt-3" >Similar movies:</h3>
                <div className="movie-list">
                    {similarMovies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        )}
        </div>
    );
};