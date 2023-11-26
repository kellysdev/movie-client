import Form from "react-bootstrap/Form";
import { useState } from "react";

export const SearchBar = ({ token }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchableMovies, setSearchableMovies] =  useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  getData = () => {
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
  };

  const componentWillMount =() => {
    getData();
  };

  componentWillMount();

  // add validation

  filterArray = () => {
    let filteredMovieObject = searchableMovies.find(searchableMovie => searchableMovie.Title == searchInput);
    if(searchInput.length > 0 && searchInput == filteredMovieObject) {
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