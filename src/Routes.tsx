import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";

function Routes({appProps}:any) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
      <AppliedRoute path="/login" exact component={Login} appProps={appProps}/>
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
