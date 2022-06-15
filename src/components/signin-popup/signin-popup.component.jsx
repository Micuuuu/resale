import React from "react";
import { Link } from "react-router-dom";
import "./signin-popup.styles.scss";

const SigninPopup = ({ setShowPopup, pageName }) => {
  const closePopup = (e) => {
    if (e.target.id === "signin-popup") {
      setShowPopup(false);
    }
  };

  return (
    <div id="signin-popup" className="SigninPopupContainer" onClick={(e) => closePopup(e)}>
      <div className="SigninPopup">
        <span className="SigninPopupTitle">Hello, Visitor</span>
        <span className="SigninPopupDescription">You need to Sign In in order to gain acces to the {pageName} page</span>
        <Link onClick={() => setShowPopup(false)} className="SigninPopupAction" to="/auth">
          Sign in now
        </Link>
      </div>
    </div>
  );
};

export default SigninPopup;
