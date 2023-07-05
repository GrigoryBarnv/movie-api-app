import React from "react";
import PropTypes, { func, string } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { Card, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Component to open movie card 
export const MovieCard = ({ movie }) => {
    return (
        <Card className="movie-card">
            <div className="movie-card-img" style={{ backgroundImage: `url(${movie.ImagePath})` }}>
              <div style={{ backgroundImage: `url(${movie.ImagePath})` }}></div>
            </div>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button>Open</Button>
            </Link>
          </Card.Footer>
        </Card>
      );
};

// Define props constraints for MovieCard
MovieCard.PropTypes = {
    movie: PropTypes.exact({
        Genre: PropTypes.exact({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.exact({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }).isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.string
}).isRequired,
onMovieClick: PropTypes.func.isRequired       
};
