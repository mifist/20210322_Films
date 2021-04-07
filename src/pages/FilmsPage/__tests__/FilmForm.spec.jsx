import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import films from "test/films";

const mockFilm = films[0];

test("FilmForm should render correct", async () => {
  const saveFilm = jest.fn(() => Promise.resolve());

  render(
    <Router>
      <FilmForm film={{}} saveFilm={saveFilm} />
    </Router>
  );

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
  expect(saveFilm).toHaveBeenCalledTimes(1);
});
