import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import films from "test/films";
import { QueryClient, QueryClientProvider } from "react-query";
import { queryConfig } from "contexts";
import { UserContextProvider } from "contexts/UserContext";
import { MemoryRouter as Router } from "react-router-dom";
import * as funcs from "hooks/films";

function wrapper({ children }) {
  const queryClient = new QueryClient(queryConfig);
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>{children}</UserContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

const mockUser = { token: "12345", role: "admin" };
const mockHistory = { push: jest.fn() };
const mockFilm = films[0];
const mockSaveFilm = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useUserState: () => mockUser,
}));

test("FilmForm should render correct", async () => {
  jest.spyOn(funcs, "useEditFilm").mockImplementation(() => mockFilm);
  jest.spyOn(funcs, "useSaveFilm").mockImplementation(() => ({
    mutate: mockSaveFilm,
  }));

  render(<FilmForm />, { wrapper });

  userEvent.type(screen.getByLabelText(/title/i), mockFilm.title);
  userEvent.type(screen.getByLabelText(/image/i), mockFilm.img);
  userEvent.type(screen.getByLabelText(/description/i), mockFilm.description);
  userEvent.type(screen.getByLabelText(/director/i), mockFilm.director);

  userEvent.type(
    screen.getByLabelText(/duration/i),
    mockFilm.duration.toString()
  );

  userEvent.type(screen.getByLabelText(/price/i), mockFilm.price.toString());
  userEvent.type(screen.getByLabelText(/featured/i), mockFilm.featured);
  const btnEl = screen.getByText(/save/i);

  await waitFor(() => userEvent.click(btnEl));
  expect(mockSaveFilm).toHaveBeenCalledTimes(1);
});

test("should render FormMessage with error", async () => {
  jest.spyOn(funcs, "useEditFilm").mockImplementation(() => ({ _id: null }));
  render(<FilmForm />, { wrapper });

  userEvent.type(screen.getByLabelText(/title/i), null);
  userEvent.type(screen.getByLabelText(/image/i), mockFilm.img);
  userEvent.type(screen.getByLabelText(/description/i), mockFilm.description);
  userEvent.type(screen.getByLabelText(/director/i), mockFilm.director);

  userEvent.type(
    screen.getByLabelText(/duration/i),
    mockFilm.duration.toString()
  );

  userEvent.type(screen.getByLabelText(/price/i), mockFilm.price.toString());
  userEvent.type(screen.getByLabelText(/featured/i), mockFilm.featured);
  const btnEl = screen.getByText(/save/i);

  await waitFor(() => userEvent.click(btnEl));
  const formMsg = screen.getByRole("alert");
  expect(formMsg).toBeInTheDocument();
});
