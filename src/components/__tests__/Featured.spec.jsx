import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmContext from "contexts/FilmContext";
import Featured from "components/Featured";

const propsData = { film: { _id: "1", featured: true } };
const toggleFeatured = jest.fn();

const RenderComponent = (props) => {
  return (
    <FilmContext.Provider value={{ toggleFeatured }}>
      <Featured {...props} />
    </FilmContext.Provider>
  );
};

test("should correct render", () => {
  const { rerender } = render(<RenderComponent {...propsData} />);

  const spanEl = screen.getByTestId("featured-span");
  const iconEl = screen.getByTestId("featured-icon");

  expect(iconEl).toHaveClass("yellow");
  userEvent.click(spanEl);

  expect(toggleFeatured).toHaveBeenCalledTimes(1);
  expect(toggleFeatured).toHaveBeenCalledWith("1");

  propsData.film.featured = false;
  rerender(<RenderComponent {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
