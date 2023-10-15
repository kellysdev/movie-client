import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieView = ({ movies, user, token }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleAddFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (favoriteMovies.includes(movie._id)) {
        alert("This movie is already in your list");
      } else {
        console.log("movie id:", movie._id);
        favoriteMovies.push(movie._id);
        setFavoriteMovies(response.json);
      }
    })
    .catch((e) => alert(e));
  };

  const handleRemoveFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method:"DELETE",
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      if (favoriteMovies.includes(movie._id)) {
        let index = favoriteMovies.indexOf(movie._id);
        let badMovie = favoriteMovies.splice(index, 1);
        console.log(badMovie);
        console.log(favoriteMovies);
      }
    })
  };

  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span><h3>{movie.Title}</h3></span>
      </div>
      <div>
        <span>{movie.ReleaseDate}</span><br />
        <span>{movie.Description}</span><br /><br />
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br />
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>Actors: </span>
        <span>{movie.Actors.join(", ")}</span>
      </div>
     
      <Button onClick={handleAddFavorite} variant="warning">Add to Favorites</Button>
      <br />
      <Button onClick={handleRemoveFavorite}variant="warning">Remove from Favorites</Button>
      <Link to={`/`}>
        <Button variant="warning" className="backButton">Back</Button>
      </Link>

    </div>
  );
};