import React from "react";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/auth/SignIn";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/404";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/auth/signin" component={SignIn} />
            <Route exact path="/auth/signup" component={SignUp} />
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
