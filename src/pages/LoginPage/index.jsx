import { useHistory } from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import api from "api";
import { useLogin } from "contexts/UserContext";

const LoginPage = () => {
  const history = useHistory();
  const login = useLogin();

  const submit = (user) =>
    api.users.login(user).then((token) => {
      login(token);
      history.push("/films");
    });

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <LoginForm submit={submit} />
      </div>
    </div>
  );
};

export default LoginPage;
