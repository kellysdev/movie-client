import React from "react";
import { useState, useEfect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ user, token, setUser, movies }) => {
  return (
    <Row>
      <Col>
        <Row>
          <UserInfo Username={user.Username} Email={user.Email} Birthday={user.Birthday}/>
        </Row>
        <Row>
          <UpdateUser />
        </Row>
      </Col>

      <Col>
        <FavoriteMovies />
      </Col>
    </Row>
  );
};