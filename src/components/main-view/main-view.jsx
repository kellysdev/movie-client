import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchBar } from "../search-bar/search-bar";

const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(JSON.stringify(userData));
  const [user, setUser] = useState(storedToken ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  useEffect(() => {
    if (!token) return;

    const storedUsername = localStorage.getItem("username");
    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${storedUsername}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const userData = data;
        // setUser(storedUser);
        return userData;
      } else {
        alert("Something went wrong.");
      }
    })
    .catch((e) => {
      alert("Error:" + e);
    });
  }, [user]);

  return (
    <BrowserRouter>
      <Row className="justify-content-sm-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView 
                      onLoggedIn={(token) => {
                        setToken(token);
                      }}
                     />
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <>
                    <NavigationBar 
                      user={user}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                    <Col md={8}>
                      <MovieView 
                      movies={movies} 
                      user={user}
                      setUser={setUser}
                      token={token}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <Col>
                    <Row>
                      <NavigationBar 
                        user={user}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                    <Row>
                      <Col className="my-4 mx-auto col-5 col-md-4 justify-content-center" >
                        <SearchBar
                          onSearchTermChange={(searchInput) => {
                            console.log(searchInput);
                            setSearchInput(searchInput);
                          }}
                          searchInput={searchInput}
                        />
                      </Col>
                    </Row>
                    <Row>
                      {
                        movies.filter((movie) => {
                          if(!searchInput) {
                            return true;
                          } else {
                            return movie.Title.toLowerCase().includes(searchInput.toLowerCase());
                          }
                        }).map((movie) => (
                          <Col className="mb-5" key={movie._id} xs={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      }
                    </Row>
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/profile"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <>
                  <NavigationBar 
                    user={user}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                  <ProfileView 
                    movies={movies} 
                    user={user} 
                    token={token}
                    setUser={setUser}
                    setToken={setToken}
                  />
                </>
              )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );

};

export default MainView;