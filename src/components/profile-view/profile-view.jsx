import React from "react";
import { useState, useEfect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);

  let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: Username,
      Email: Email,
      Birthday: Birthday
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
          <h2>{user.Username}</h2>
          <p>
            Email: {user.Email}<br />
            Birthday: {user.Birthday}
          </p>        
        </Row>

        <Row>
          <h3>Update User Info:</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                // value={Username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                // value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                // value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                // value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
        </Row>
      </Col>

      <Col>
        <Row>
            <h2>Favorite Movies</h2>
            {!favoriteMovies ? (
              <div>You haven't added any movies to your list of favorites.</div>
            ) : (
              // Why doesn't it like this?
              {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} xs={3}>
                  <MovieCard movie={movie} />
                </Col>
            ))}
          )}
        </Row>
      </Col>

    </Row>
  );
};