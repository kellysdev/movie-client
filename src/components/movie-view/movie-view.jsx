import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieView = ({ movies, user, token, handleAddFavorite, handleRemoveFavorite }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId);

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

      <div>
        <Button onClick={handleAddFavorite} variant="warning">Add to Favorites</Button>
        <br />
        <Button onClick={handleRemoveFavorite}variant="warning">Remove from Favorites</Button>
        
        <Link to={`/`}>
          <Button variant="warning" className="backButton">Back</Button>
        </Link>
      </div>

    </div>
  );
};