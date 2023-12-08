import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

export const MovieView = ({ movies, user, token, favoriteMovies, setFavoriteMovies }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const handleAddFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (response.ok && favoriteMovies.includes(movie._id)) {
        alert("This movie is already in your list");
        return false;
      } else if (response.ok) {
        console.log("movie id:", movie._id);
        setFavoriteMovies(prev => [movie, ...prev]);
        alert("This movie has been added to your list");
      } else {
        alert("Something went wrong.");
        return false;
      }
    })
    .catch((e) => alert(e));
  };

  const handleRemoveFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      if (favoriteMovies.includes(movie._id)) {
        setFavoriteMovies(prev => prev.filter(favoriteMovie => favoriteMovie !== movie._id));
        alert("This movie has been removed from your list.");
      } else {
        alert("Could not remove the movie from your list.");
      }
    })
    .catch((e) => alert(e));
  };

  return (
    <>
    <Row className="justify-content-center">
      <Col className="col-6">
        <Row>
          <h3>{movie.Title}</h3>
        </Row>
        <Row>
          <p>{movie.ReleaseDate}</p><br />
          <p>{movie.Description}</p><br /><br />
          <p>Genre: {movie.Genre.Name}<br />
            Director: {movie.Director.Name}<br />
            Actors: {movie.Actors.join(", ")}</p>
        </Row>

        <Row className="movieview-buttons">
          <Button onClick={handleAddFavorite} className="p-2 m-2" variant="warning">Add to Favorites</Button>
          <Button onClick={handleRemoveFavorite} className="p-2 m-2" variant="warning">Remove from Favorites</Button>

          {/* <Link to={`/`}>
            <Button variant="warning" className="p-2 ms-auto">Home</Button>
          </Link> */}
        </Row>
      </Col>

      <Col className="col-1"></Col>

      <Col className="col-5">
        <img className="movieview-image" src={movie.ImagePath} />
      </Col>
    </Row>
    </>
  );
};