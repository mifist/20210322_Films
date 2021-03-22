import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { UserContextProvider } from "contexts/UserContext";
import mockApi from "api";

const fakeData = { email: "u1@com.ua", password: "secret" };
const mockToken = "12345";

jest.mock("api");

const mockLogin = jest.fn();
jest.mock("contexts/UserContext", () => ({
  useLogin: () => mockLogin,
}));

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

test("should correct render", async () => {
  mockApi.users.login.mockResolvedValueOnce(mockToken);

  render(
    <Router>
      <LoginPage />
    </Router>,
    { wrapper: UserContextProvider }
  );
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, fakeData.email);
  userEvent.type(passwordEl, fakeData.password);

  await waitFor(() => userEvent.click(btnEl));

  expect(mockApi.users.login).toHaveBeenCalledTimes(1);
  expect(mockApi.users.login).toHaveBeenCalledWith(fakeData);

  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith(mockToken);

  expect(mockHistory.push).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledWith("/films");
});
