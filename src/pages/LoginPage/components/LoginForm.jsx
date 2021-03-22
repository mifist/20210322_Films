import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import FormMessage from "components/FormMessage";
import setFormObj from "components/FormUtils";

const initialData = {
  email: "",
  password: "",
};

const LoginForm = ({ submit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "wrong format email";
    if (!data.password) errors.password = "Password cannot be blank";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      submit(data).catch((error) => {
        setErrors(error.response.data.errors);
        setLoading(false);
      });
    }
  };
  const cls = loading ? "ui form loading" : "ui form";
  return (
    <form data-testid="login-form" className={cls} onSubmit={handleSubmit}>
      <div className={errors.email ? "error field" : "field"}>
        <label htmlFor="email">Email</label>
        <input
          value={data.email}
          onChange={setFormObj(data, setData)}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>

      <div className={errors.password ? "error field" : "field"}>
        <label htmlFor="password">Password</label>
        <input
          value={data.password}
          onChange={setFormObj(data, setData)}
          type="text"
          name="password"
          id="password"
          placeholder="password"
        />
        {errors.password && <FormMessage>{errors.password}</FormMessage>}
      </div>
      <div className="ui fluid buttons">
        <button className="ui button primary">Login</button>

        <div className="or" />

        <Link to="/" className="ui button">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
