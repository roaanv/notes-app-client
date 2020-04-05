import React from "react";
import { Route } from "react-router-dom";

function AppliedRoute({ component: C, appProps, ...rest }:any) {
  return (
    // https://serverless-stack.com/chapters/add-the-session-to-the-state.html
    <Route {...rest} render={props => <C {...props} {...appProps} />}/>
  );
}

export default AppliedRoute;
