import { render, screen, fireEvent } from "@testing-library/react";
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

test("click should invoke subtmi", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const { email, password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  fireEvent.change(emailEl, { target: { value: email } });
  fireEvent.change(passwordEl, { target: { value: password } });

  fireEvent.click(btnEl);
});
