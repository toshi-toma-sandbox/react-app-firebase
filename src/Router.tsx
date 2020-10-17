import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "UserContext";
import { TodoList } from "TodoList";
import React, { useContext } from "react";

const PrivateRoute: React.FC<{ path: string }> = ({ children, ...props }) => {
  const { currentUser } = useContext(UserContext);
  if (currentUser === null) {
    return <Redirect to="/login" />;
  }

  return <Route {...props}>{children}</Route>;
};

export const Router = () => {
  const { currentUser } = useContext(UserContext);
  console.log("userContext", currentUser);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={() => {
            if (currentUser !== null) {
              return <Redirect to="/" />;
            }
            return <h2>Login</h2>;
          }}
        />
        <PrivateRoute path="/">
          <TodoList />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};
