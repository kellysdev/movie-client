import React from "react";
import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState(user.favoriteMovies);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: Username,
      Email: Email,
      Birthday: Birthday,
      FavoriteMovies: favoriteMovies
    };

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then ((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Update failed")
      }
    })
    .then ((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  return (
    <Row>
      <Col>
        <Row>
          <h3>User Information</h3>
          <p>
            Username: {user.Username}<br />
            Email: {user.Email}<br />
            Birthday: {user.Birthday}
          </p>  
        </Row>

        <Row>
          <h5>Update your information:</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
              />
          </Form.Group>

          <Button type="submit" variant="warning">Submit</Button>
        </Form>
        </Row>
      </Col>

      <Col>
        <Row>
            <h3>Favorite Movies</h3>
            {!favoriteMovies ? (
              <div>You haven't added any movies to your list.</div>
            ) : (
              <Col className="mb-5" key={movies._id} xs={3}>
                  <MovieCard movie={favoriteMovies} />
              </Col>
          )}
        </Row>
      </Col>

    </Row>
  );
};