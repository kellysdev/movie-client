import React from "react";
import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, setToken, movies, favoriteMovies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const favoriteMovieObjects = favoriteMovies.map(favoriteMovie => {
    if (favoriteMovies.length === 0) {
      return;
    } else {
      const movieObject = movies.find(movie => movie._id === favoriteMovie);
      return movieObject;
    }
  });

  const validate = () => {
    const newErrors = {}

    if (Username.includes("_")) {
      newErrors.Username = "Your username must be alphanumeric."
    } else if(!Password) {
      newErrors.Password = "Required."
    } else if (!Email) {
      newErrors.Email = "Required."
    } else if (Email.includes(!"@") || Email.includes(!".com")) {
      newErrors.Email = "Please enter a valid email."
    } else if (!Birthday) {
      newErrors.Birthday = "Required."
    }

    return newErrors
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validate()
    
    if(Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setValidated(false);
      return false;
    } else {
      setValidated(true);
    };

    let data = {
      Username: Username,
      Email: Email,
      Birthday: Birthday
    };
    if(Password) {
      data["Password"] = Password
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
        alert("something went wrong.");
        return false;
      }
    })
    .then ((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      alert("Your information has been updated.");
    })
    .catch (e => {
      console.log(e),
      alert("Update failed.");
    })
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeregister = () => {
    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (response.ok) {
        setUser(null);
        setToken(null);
        alert("You have deregistered your account.");
      } else {
        alert("Something went wrong.");
      }
    })
  };

  return (
    <>
      <Row>
        <Col>
          <Row className="my-3">
            <h3>Account Information</h3>
            <p>
              Username: {user.Username}<br />
              Email: {user.Email}<br />
              Birthday: {user.Birthday}
            </p>  
          </Row>

          <Row className="my-3">
            <Col>
              <h5>Update your account:</h5>
              <Form noValidate onSubmit={handleSubmit}>

                <InputGroup hasValidation>
                  <Form.Group>
                    <Form.Control className="my-3"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername( e.target.value)}
                      required
                      minLength="3"
                      isInvalid={errors.Username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control className="my-3"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      isInvalid={errors.Password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control className="my-3"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      isInvalid={errors.Email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control className="my-3"
                      // type="date"
                      placeholder="Birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      isInvalid={errors.Birthday}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Birthday}
                    </Form.Control.Feedback>
                  </Form.Group>
                </InputGroup>

                <Container className="welcome-buttons mt-3">
                  <Button type="submit" variant="warning">Update</Button>
                </Container>
              </Form>
            </Col>
          </Row>

          <Row>
            <Button onClick={handleShowModal} variant="link" className="deregister fs-6">Remove account permanently</Button>
          </Row>
        </Col>

        <Col className="col-1"></Col>

        <Col>
          <Row className="my-3">
              <h3>Favorite Movies</h3>
              {favoriteMovieObjects.map((movie) => (
                <Col className="mb-5" key={favoriteMovieObjects._id} sm={4}>
                  <MovieCard 
                    movie={movie}
                   />
                </Col>
              ))}
          </Row>
        </Col>

      </Row>

      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header>
          <Modal.Title>Deregister Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to deregister your account?
          </Modal.Body>
        <Modal.Footer>
          <Button 
          onClick={handleDeregister}
          variant="danger">
            Deregister
          </Button>
          <Button onClick={handleCloseModal} variant="warning">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};