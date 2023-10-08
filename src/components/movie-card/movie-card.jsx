import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string,
    ReleaseDate: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape ({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    Actors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};