import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const initUser = {
  token: null,
  role: "user",
};

class App extends Component {
  state = {
    user: initUser,
  };

  logout = () => this.setState({ user: { token: null } });

  render() {
    const { user } = this.state;
    return (
      <Suspense fallback={FullSpinner}>
        <div className="ui container mt-3">
          <TopNavigation logout={this.logout} isAuth={!!user.token} />

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </div>
      </Suspense>
    );
  }
}

export default App;
