import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import {useAppContext} from "../libs/contextLib";
import {onError} from "../libs/errorLib";

interface AuthenticatedRouteProps extends RouteProps {
  children: any;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

export default AuthenticatedRoute;