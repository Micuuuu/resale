import FormInput from "../form-input/form-input.component";

import { useState } from "react";
import {
  sigInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import "./sign-in-form.styles.scss"


const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const response = await sigInWithGooglePopup();
    createUserDocumentFromAuth(response.user);
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
 

    try {
     const response = await SignInAuthWithEmailAndPassword(email, password)
     console.log(response)
     resetFormFields()
    } catch (error) {
      if(error.code === "auth/wrong-password")
        alert("the password is incorect")
      else if(error.code === "auth/user-not-found")
        alert("The email doesn t exist")

      console.log( error);
    }
  };

  return (
    
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
     

        
        <FormInput
          label = "Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label = "Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
      <div className="buttons-container">
      <Button type="submit" >Sign In</Button>
      <Button type = 'button' buttonType = 'google' onClick = {signInWithGoogle} >Google Sign In</Button>
      </div>
      </form>
    </div>
  );
};

export default SignInForm;
