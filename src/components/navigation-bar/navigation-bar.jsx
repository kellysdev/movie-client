import { Navbar, Container, Nav, NavbarBrand, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="sm" bg="light">
      <Container>
        <Navbar.Brand to="/">PopOpolis</Navbar.Brand>
        <Nav>
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};