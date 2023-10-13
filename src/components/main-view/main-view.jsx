import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // if a user logs in and generates a token: use token to fetch movies from the database, set movies to array, store token
    if (!token) return;

    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((movies) => {
      // console.log(movies);
      setMovies(movies);
    });
  }, [token]);

  return (
    <Row className="justify-content-sm-center">
      {!user ? (
        // if no user, return LoginView or SignupView
        <Col md={5}>
            <LoginView 
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
        </Col>
      ) : selectedMovie ? (
        // if a movie is selected, display MovieView
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          </Col>
      ) : movies.Length === 0 ? (
        <div>No movies in the list!</div>
      ) : (
        // displays movie cards for movies in array and selects a movie when one is clicked on
        <>
        {movies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
            <MovieCard 
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
           />
          </Col>
        ))}
        <button onClick={() => {
          // button at the bottom of MainView
            setUser(null); 
            setToken(null); 
            localStorage.clear();
          }}>Logout
        </button>
      </>
      )}
    </Row>
  );

};

export default MainView;