import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Logo } from "../logo/logo.jsx";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //prevent submit button reloading the page
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
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
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
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="warning">Submit</Button>

      </Form>
    </>
  )
};