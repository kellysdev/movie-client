import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
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
    <Row> 
      {!user ? (
        <>
          <LoginView 
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />

          or

          <SignupView />
        </>
      ) : selectedMovie ? (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      ) : movies.Length === 0 ? (
        <div>No movies in the list!</div>
      ) : (
        <>
        {movies.map((movie) => (
          <MovieCard 
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
           />
        ))}
        <button onClick={() => {
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