import React, { useEffect, useState } from "react";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/auth/SignIn";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/404";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { useHasUser } from "./store/userStore";

const history = createBrowserHistory();

function App() {
  const hasUser = useHasUser();
  const [, setPrevHasUser] = useState(hasUser);

  useEffect(() => {
    setPrevHasUser(hasUser);
  }, [hasUser]);

  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/auth/signin" component={SignIn} />
            <Route exact path="/auth/signup" component={SignUp} />
            <PrivateRoute exact path="/home" component={Dashboard} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
