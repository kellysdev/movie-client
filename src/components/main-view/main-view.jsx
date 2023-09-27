import { useState } from "react";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      Id: 1,
      Title: "Dune",
      Description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
      Genre: "Action",
      Director: "Dennis Villeneuve",
      ImagePath: "https://m.media-amazon.com/images/I/61QbqeCVm0L.jpg",
      Featured: false,
      Actors: ["Timothee Chalamet", "Rebecca Ferguson", "Oscar Isaac"]
    },
    {
      Id: 2,
      Title: "Barbie",
      Description: "Barbie suffers a crisis that leads her to question her world and her existence.",
      Genre: "Comedy",
      Director: "Greta Gerwig",
      ImagePath: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      Featured: false,
      Actors: ["Margot Robbie", "Ryan Gosling"]
    },
    {
      Id: 3,
      Title: "Howl's Moving Castle",
      Description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
      Genre: "Animation",
      Director: "Hayao Miyazaki",
      ImagePath: "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      Featured: false,
      Actors: ["Emily Mortimer", "Jean Simmons", "Christian Bale", "Billy Crystal"]
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => {
          <MovieCard />
        })}
      </div>
    );
  }

};