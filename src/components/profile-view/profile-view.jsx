import { useState } from "react";
import { MainView } from "../main-view/main-view";
import { MovieCard } from "../movie-card/movie-card";
import { SignupView } from "../signup-view/signup-view";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UpdateView } from "./update-view";


export const ProfileView = () => {

    const user = useSelector(state => state.user.user);
    const movies = useSelector(state => state.movies.movies);
    const [showForm, setShowForm] = useState(false);
    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

    return (

        <Row className="d-flex flex-column p-2 main-row">

            <Card className="profile-card p-2">
                    <Card.Title>
                        User information:
                    </Card.Title>
                    <Card.Body>
                    <Card.Text>
                        Username: {user.Username}
                    </Card.Text>
                    <Card.Text>
                        Email: {user.Email}
                    </Card.Text>
                    <Card.Text>
                        Birthday: {new Date(user.Birthday).toISOString().substring(0, 10)}
                    </Card.Text>
                    <Button className="mb-2 edit-button" onClick={() => setShowForm(!showForm)}>Edit</Button>
                    {showForm && <UpdateView setShowForm={setShowForm}/>}
                </Card.Body>
            </Card>

            {favoriteMovies.length > 0 && (
                <Col md={12} className="mt-5 d-flex flex-column">
                <h3 className="d-inline-flex mb-3 my-0">
                    <span>Favorite movies: </span>
                </h3>
                <Row>
                        {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                    <div>The list is empty!</div>
                            ) : (
                                <div className="movie-list">
                                    {favoriteMovies.map((movie) => (
                                        <MovieCard movie={movie} key={movie.id} />
                                    ))}
                                </div>
                            )
                        }
                </Row>
            </Col>
            )}
        </Row>
    );
};