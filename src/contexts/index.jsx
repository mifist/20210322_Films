import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "contexts/UserContext";
import { FilmsContextProvider } from "contexts/FilmContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export const queryClient = new QueryClient(queryConfig);

function AppProviders({ children }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <FilmsContextProvider>
            {children}
            <ReactQueryDevtools />
          </FilmsContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export { AppProviders };
