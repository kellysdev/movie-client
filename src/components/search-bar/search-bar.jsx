import Form from "react-bootstrap/Form";

export const SearchBar = ({}) => {
  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search"
        size="sm"
        // onChange={handleInputChange}
        aria-label="Search"
      />
    </Form>
  );
};