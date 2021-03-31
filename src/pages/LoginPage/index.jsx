import React from "react";
import LoginForm from "pages/LoginPage/components/LoginForm";

const LoginPage = (props) => {
  return (
    <div className="ui grid">
      <div className="eight wide column">
        <LoginForm submit={(data) => Promise.resolve(data)}/>
      </div>
    </div>
  );
};

export default LoginPage;
