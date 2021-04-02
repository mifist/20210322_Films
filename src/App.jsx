import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";
import { setAuthorizationHeader } from "api";

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
    message: "",
  };

  login = (token) => {
    this.setState({ user: { token, role: "user" } });
    localStorage.filmsToken = token;
    setAuthorizationHeader(token);
  };

  logout = () => {
    this.setState({ user: { token: null, role: "" } });
    setAuthorizationHeader();
    delete localStorage.filmsToken;
  };

  setMessage = (message) => this.setState({ message });

  render() {
    const { user, message } = this.state;
    return (
      <Suspense fallback={FullSpinner}>
        <div className="ui container mt-3">
          <TopNavigation logout={this.logout} isAuth={!!user.token} />

          {message && (
            <div className="ui info message">
              <i onClick={() => this.setMessage("")} className="close icon" />
              {message}
            </div>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
          <Route path="/signup">
            <SignupPage setMessage={this.setMessage} />
          </Route>
          <Route path="/login">
            <LoginPage login={this.login} />
          </Route>
        </div>
      </Suspense>
    );
  }
}

export default App;
