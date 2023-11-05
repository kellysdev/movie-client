import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Title>{movie.Title}</Card.Title>
      <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
        <Button variant="warning">
          Open
        </Button>
      </Link>
    </Card>
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
  }).isRequired
};