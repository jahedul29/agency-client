import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import "./AppNavbar.css";

const AppNavbar = () => {
  let history = useHistory();
  const { loggedInUser } = useContext(UserContext);

  return (
    <Container className="nav-container" fluid>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand onClick={() => history.replace("/")}>
          <img className="logo" src="https://i.imgur.com/UMV8bTj.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link to="/">Home</Nav.Link>
            <Nav.Link
              onClick={() => {
                if (loggedInUser.email) {
                  if (loggedInUser.isAdmin) {
                    history.push("/serviceList");
                  } else {
                    history.push("/order");
                  }
                } else {
                  history.push("/login");
                }
              }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link>Our Team</Nav.Link>
            <Nav.Link>Contact Us</Nav.Link>
            <Button
              onClick={() => history.push("/login")}
              className="nav-login-button "
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default AppNavbar;
