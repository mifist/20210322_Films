import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "contexts";
import Featured from "components/Featured";

const propsData = { film: { _id: "1", featured: true } };
const mockToggleFeatured = jest.fn();

jest.mock("contexts/FilmContext", () => ({
  ...jest.requireActual("contexts/FilmContext"),
  useToggleFeatured: () => mockToggleFeatured,
}));

const RenderComponent = (props) => {
  return (
    <AppProviders>
      <Featured {...props} />
    </AppProviders>
  );
};

test("should correct render", () => {
  const { rerender } = render(<RenderComponent {...propsData} />);

  const spanEl = screen.getByTestId("featured-span");
  const iconEl = screen.getByTestId("featured-icon");

  expect(iconEl).toHaveClass("yellow");
  userEvent.click(spanEl);

  expect(mockToggleFeatured).toHaveBeenCalledTimes(1);
  expect(mockToggleFeatured).toHaveBeenCalledWith("1");

  propsData.film.featured = false;
  rerender(<RenderComponent {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
