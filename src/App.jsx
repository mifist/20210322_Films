import { lazy, Suspense, useState } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";
import { useUserState } from "contexts/UserContext";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const App = () => {
  const [message, setMessage] = useState("");
  const user = useUserState();

  return (
    <Suspense fallback={FullSpinner}>
      <div className="ui container mt-3">
        <TopNavigation />

        {message && (
          <div className="ui info message">
            <i onClick={() => setMessage("")} className="close icon" />
            {message}
          </div>
        )}

        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/films">
          <FilmsPage user={user} />
        </Route>

        <Route path="/signup">
          <SignupPage setMessage={setMessage} />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </div>
    </Suspense>
  );
};

export default App;
