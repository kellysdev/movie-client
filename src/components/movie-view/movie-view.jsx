import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
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
        <span>{movie.Description}</span><br />
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br />
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>Actors: </span>
        <span>{movie.Actors.join(", ")}</span>
      </div>
      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};