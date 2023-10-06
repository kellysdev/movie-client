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
        <span>{movie.Genre.Name}</span>
        <br />
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>Actors: </span>
        <span>{movie.Actors.map((actor) => actor.Name)}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};