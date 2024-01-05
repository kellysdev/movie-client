import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link }from "react-router-dom";
import { Logo } from "../logo/logo.jsx";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password
    }

    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem(
          "username", 
          JSON.parse(JSON.stringify(data.user.Username))
        );
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    })
  };

  return (
    <>
      <Logo />

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formUsername">
          <Form.Control 
            type="text"
            value={Username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        
        <Form.Group controlId="formPassword">
          <Form.Control className="mt-3"
            type="password"
            value={Password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Container className="welcome-buttons mt-3">
          <Button type="submit" variant="warning" className="">Login</Button>
        </Container>
        <Container className="d-grid">
          <Link className="welcome-links mt-3" to="/signup">
            Don't have an account?
          </Link>
        </Container>

      </Form>
    </>
  )
};