import PropTypes from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="me-2 mb-2 text-decoration-none">
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} className="moviecard-image"/>
      <Card.Title>{movie.Title}</Card.Title>
      <CardBody className="d-flex flex-column mt-n3">      
        <p className="fs-6 text-muted text-end mt-auto">{movie.Genre.Name}</p>

        {/* <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="me-2 mb-2 ml-x">
          <Button variant="warning">
            Open
          </Button>
        </Link> */}

      </CardBody>
    </Card>
    </Link>
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