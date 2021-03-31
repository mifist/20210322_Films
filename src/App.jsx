import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import FilmsPage from "pages/FilmsPage";
import SignupPage from "pages/SignupPage";
import LoginPage from "pages/LoginPage";

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
    );
  }
}

export default App;
