import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { UserContextProvider } from "contexts/UserContext";
import mockApi from "api";

const fakeData = { email: "u1@com.ua", password: "secret" };

test("should correct render", () => {
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

  userEvent.click(btnEl);
});
