import React from "react";
import { useState, useEfect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);

  let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

  handleSubmit = (event) => {
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
          <UpdateUser  />
        </Row>
      </Col>

      <Col>
        <FavoriteMovies />
      </Col>
    </Row>
  );
};