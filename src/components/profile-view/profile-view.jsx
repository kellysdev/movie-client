import React from "react";
import { useState, useEfect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, setUser, movies }) => {
  return (
    <Row>
      <Col>
        <UserInfo user={user.Username} Email={user.Email} Birthday={user.Birthday}/>
      </Col>

      <Col>
        <FavoriteMovies />
      </Col>
    </Row>
  );
};