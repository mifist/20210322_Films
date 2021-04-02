import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";
import UserContext from "contexts/UserContext";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

class App extends Component {
  state = {
    user: initUser,
    message: "",
  };

  setMessage = (message) => this.setState({ message });

  render() {
    const { user, message } = this.state;
    return (
      <Suspense fallback={FullSpinner}>
        <div className="ui container mt-3">
          <TopNavigation
            isAdmin={!!user.token && user.role === "admin"}
            logout={this.logout}
            isAuth={!!user.token}
          />

          {message && (
            <div className="ui info message">
              <i onClick={() => this.setMessage("")} className="close icon" />
              {message}
            </div>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>

          <UserContext.Provider value={{ user }}>
            <Route path="/films" render={(props) => <FilmsPage {...props} />} />
          </UserContext.Provider>

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
