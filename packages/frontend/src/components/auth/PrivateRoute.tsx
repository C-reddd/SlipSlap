import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useHasUser } from "../../store/userStore";

type Props = RouteProps & {
  component: () => JSX.Element;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const hasUser = useHasUser();
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props =>
        hasUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/signin",
              state: { from: location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
