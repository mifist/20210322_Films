import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "contexts/UserContext";

function AppProviders({ children }) {
  return (
    <Router>
      <UserContextProvider>{children}</UserContextProvider>
    </Router>
  );
}

export { AppProviders };
