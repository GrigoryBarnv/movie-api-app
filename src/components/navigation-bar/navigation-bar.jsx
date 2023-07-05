import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { SearchView } from "../search-view/search-view";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

export const NavigationBar = () => {

  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const onLoggedOut = () => {
    localStorage.clear();
    dispatch(setUser(null, null))
    window.open('/', '_self');
  }

  return (
    <Navbar className="navigation-bar" expand="md lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <SearchView 
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};