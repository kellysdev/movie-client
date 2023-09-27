export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span><h2>{movie.Title}</h2></span>
      </div>
      <div>
        {movie.Description}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
        <br />
        <span>Director: </span>
        <span>{movie.Director}</span>
        <br />
        <span>Actors: </span>
        <span>{movie.Actors}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};