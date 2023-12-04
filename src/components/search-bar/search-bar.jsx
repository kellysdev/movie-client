import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

export const SearchBar = ({ token }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchableMovies, setSearchableMovies] =  useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // add validation

  useEffect(() => {
    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(movies => {
      setSearchableMovies(movies);
    })
    .catch(e => {
      console.log(e.message);
      alert("Could not search movies.");
    })
  }, [searchInput]);

  filterArray = () => {
    let filteredMovieObject = searchableMovies.map(searchableMovie => 
      searchableMovie.Title.toLowerCase() == searchInput.toLowerCase());
    console.log(filteredMovieObject);

    if(searchInput.length > 0 && filteredMovieObject) {
      setFilteredMovies(filteredMovieObject);
      return filteredMovies;
    } else {
      setFilteredMovies([]);
      return filteredMovies;
    }
  };

  handleInputChange = (e) => {
    setSearchInput(e.target.value);
    filterArray();
  };

  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search"
        size="sm"
        onChange={handleInputChange}
        aria-label="Search"
      />
    </Form>
  );
};