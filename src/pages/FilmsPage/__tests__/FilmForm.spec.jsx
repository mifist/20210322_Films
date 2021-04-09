import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import films from "test/films";
import { AppProviders } from "contexts";

const mockUserState = { token: "12345", role: "admin" };

jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useUserState: () => mockUserState,
}));

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

const mockFilm = films[0];
const mockSaveFilm = jest.fn();
jest.mock("contexts/FilmContext", () => ({
  ...jest.requireActual("contexts/FilmContext"),
  useStateFilms: () => mockFilm,
  useSaveFilm: () => mockSaveFilm,
}));

test("FilmForm should render correct", async () => {
  mockSaveFilm.mockImplementation(() => Promise.resolve(mockFilm));

  render(<FilmForm />, { wrapper: AppProviders });

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
  render(<FilmForm />, { wrapper: AppProviders });

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
