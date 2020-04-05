import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div className="App container">
      <Navbar collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              {/*LinkContainer makes it so that it */}
              {/*doesn't do a page redirect*/}
              {isAuthenticated
                ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                : <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }}/>
    </div>
  );
}

export default App;
