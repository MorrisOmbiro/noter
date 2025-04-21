import React from "react";
import { Redirect, Route } from "react-router-dom";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute: React.FC<{
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
