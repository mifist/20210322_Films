import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "contexts";
import Featured from "components/Featured";
import * as funcs from "hooks/films";

const propsData = { film: { _id: "1", featured: true } };

const wrapper = ({ children }) => <AppProviders>{children}</AppProviders>;

test("should correct render", async () => {
  const mockToggleFeatured = jest.fn();
  jest.spyOn(funcs, "useToggleFeatured");
  funcs.useToggleFeatured.mockImplementation(() => ({
    mutate: mockToggleFeatured,
  }));

  const { rerender } = render(<Featured {...propsData} />, {
    wrapper,
  });

  const spanEl = screen.getByTestId("featured-span");
  const iconEl = screen.getByTestId("featured-icon");

  expect(iconEl).toHaveClass("yellow");
  await waitFor(() => userEvent.click(spanEl));

  expect(mockToggleFeatured).toHaveBeenCalledTimes(1);
  propsData.film.featured = false;

  expect(mockToggleFeatured).toHaveBeenCalledWith(propsData.film);

  propsData.film.featured = false;
  rerender(<Featured {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
