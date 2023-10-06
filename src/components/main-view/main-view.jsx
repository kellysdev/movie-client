import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      console.log("This is data", data)
      // const moviesFromApi = data((doc) => {
      //   return {
      //     _id: doc.key,
      //     ImagePath: doc.ImagePath,
      //     Title: doc.Title,
      //     ReleaseDate: doc.ReleaseDate,
      //     Description: doc.Description,
      //     Genre: doc.Genre,
      //     Director: doc.Director,
      //     Actors: doc.Actors
      //   };
      // });

      setMovies(data);
    });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>No movies in the list!</div>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard 
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
         />
      ))}
    </>
  );

};

export default MainView;