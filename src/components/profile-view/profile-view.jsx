import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";

export const ProfileView = ({ user, token, setUser, movies }) => {
  return (
    <>
      <UserInfo />
    </>
  );
};