import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    };
  
    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    })
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength = "3"
         />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type="email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
        type="date"
        value={Birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        />
      </Form.Group>

      <Button type="submit">Sign Up</Button>
    </Form>
  )
};