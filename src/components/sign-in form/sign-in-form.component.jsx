import { useState } from "react";
import { sigInWithGooglePopup, SignInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    sigInWithGooglePopup();
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      const signIn = await SignInAuthWithEmailAndPassword(email, password);
      if (signIn) {
        console.log(signIn);
        setIsLoading(false);
        resetFormFields();
        window.location.pathname = "/";
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") setErrorMessage("Incorrect password.");
      else if (error.code === "auth/user-not-found") setErrorMessage("The email doesn't exist.");
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      {isLoading ? (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
        {errorMessage.length ? <div className="ErrorMessage">{errorMessage}</div> : ""}
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
