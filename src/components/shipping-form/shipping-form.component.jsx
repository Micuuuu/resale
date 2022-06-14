import FormInput from "../form-input/form-input.component";
import { useSelector } from "react-redux";
import { selectUserDataMapById } from "../../store/user-data/user-data.selector";
import Button from "../button/button.component";
import React, { useState } from "react";
import { updateUserDocument } from "../../utils/firebase/firebase.utils";


import "./shipping-form.styles.scss";

const ShippingForm = ({id, title}) => {

      //shipping address form
  const userDataMapById = useSelector(selectUserDataMapById);
  const defaultFormFields = userDataMapById[id].shippingAddress;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, country, county, city, address, zipCode, phoneNumber } =
  formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUserDocument(userDataMapById[id], formFields, "shippingAddress");
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("email already in use");
      console.log("user creation encountered an error", error);
    }
  };

    return(

        <div className="settings-address-upload-container">
     
          <h2>{title}</h2>
          <form className="settings-address-form" onSubmit={handleSubmit}>
            
            <div className="address-form-row">
              <FormInput
                label="Name"
                required
                type="text"
                onChange={handleChange}
                name="name"
                value={name}
              />

              <FormInput
                label="Country"
                required
                type="text"
                onChange={handleChange}
                name="country"
                value={country}
              />
            </div>
         
            <div className="address-form-row">
              <FormInput
                label="County"
                required
                type="text"
                onChange={handleChange}
                name="county"
                value={county}
              />
              <FormInput
                label="City"
                required
                type="text"
                onChange={handleChange}
                name="city"
                value={city}
              />
            </div>
            <div className="address-form-address">
            <FormInput 
              label="Address"
              required
              type="text"
              onChange={handleChange}
              name="address"
              value={address}
            />
            </div>
          
            
           
            <div className="address-form-row">
              <FormInput
                label="Phone Number"
                required
                type="text"
                onChange={handleChange}
                name="phoneNumber"
                value={phoneNumber}
              />
              <FormInput 
                label="Zip Code"
                required
                type="text"
                onChange={handleChange}
                name="zipCode"
                value={zipCode}
              />

            </div>
            <div className="address-form-button">
            <Button buttonType="inverted" onSubmit = {handleSubmit}>UPDATE</Button>
            </div>
          </form>
        

      

      </div>
    );


}


export default ShippingForm
