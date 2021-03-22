import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server, rest } from "test/server";
import FilmsPage from "pages/FilmsPage/index";
import { AppProviders } from "contexts";

const mockUserState = { token: "12345", role: "admin" };
jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useUserState: () => mockUserState,
}));

test("should render admin buttons", async () => {
  render(<FilmsPage />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.queryByTestId("admin-buttons")).toBeInTheDocument();
});

test("should render spinner", async () => {
  server.use(
    rest.get("/api/authfilms", async (req, res, ctx) => {
      return res(ctx.json({ films: [] }));
    })
  );

  render(<FilmsPage />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.queryByLabelText("message")).toBeInTheDocument();
});
