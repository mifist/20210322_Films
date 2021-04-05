import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import { fake, build } from "@jackfranklin/test-data-bot";

const buildFormData = build({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
});

test("onChange should change controls email, password", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const { email, password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);

  fireEvent.change(emailEl, { target: { value: email } });
  fireEvent.change(passwordEl, { target: { value: password } });

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);
});

test("should invoke handleSubmit", () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );
  const { email, password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, email);
  userEvent.type(passwordEl, password);

  userEvent.click(btnEl);

  expect(submit).toHaveBeenCalledTimes(1);
  expect(submit).toHaveBeenCalledWith({ email, password });

  userEvent.click(btnEl);

  const formMsg = screen.queryByRole("alert");
  expect(formMsg).toBeNull();
});

test("should show error message", () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );
  const { password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, "fake email");
  userEvent.type(passwordEl, password);

  userEvent.click(btnEl);

  const formMsg = screen.queryByRole("alert");
  expect(formMsg).toBeInTheDocument();

  const form = screen.getByTestId("login-form");
  expect(form).not.toHaveClass("loading");
});
