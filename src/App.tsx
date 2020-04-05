import React, {useEffect, useState} from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "./App.css";

const App: React.FC<RouteComponentProps> = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // deps is an empty list, then it will only fire the
  // method on first load
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);

    // Redirect to login page after logout
    props.history.push("/login");
  }

  return (
    <>
      {!isAuthenticating &&
      <div className="App container">
        <Navbar collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
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
        < Routes appProps={{isAuthenticated, userHasAuthenticated}}/>
      </div>
      }
    </>
  );
};

// App is not renders (wrapped) via the Route component
// But we still want access to the history
export default withRouter(App);

