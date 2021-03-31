import React from "react";
import SignupForm from "pages/SignupPage/components/SignupForm";

const SignupPage = (props) => {
  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignupForm submit={(data) => Promise.resolve(data)} />
      </div>
    </div>
  );
};

export default SignupPage;
