import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

function Routes({appProps}:any) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps}/>

      {/*<AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />*/}

      <UnauthenticatedRoute exact path="/login">
        <Login {...appProps}/>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup {...appProps}/>
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/new">
        <NewNote {...appProps}/>
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/:id">
        <Notes />
      </AuthenticatedRoute>

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
