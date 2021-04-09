import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "contexts/UserContext";
import { FilmsContextProvider } from "contexts/FilmContext";

function AppProviders({ children }) {
  return (
    <Router>
      <UserContextProvider>
        <FilmsContextProvider>{children}</FilmsContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export { AppProviders };
