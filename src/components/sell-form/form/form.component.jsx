import FormInput from "../../form-input/form-input.component";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import CurrencyInput from "react-currency-input-field";



import { updateUserDocument } from "../../../utils/firebase/firebase.utils";
import { createItemsDocument } from "../../../utils/firebase/firebase.utils";

import { storage } from "../../../utils/firebase/firebase.utils";

import Button from "../../button/button.component";

import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const itemDefaultFormFields = {
  title: "",
  gender: "women",
  category: "select an item ",
  size: "",
  brand: "",
  color: "",
  material: "",
  itemDescription: "",
  image: "",
};

const Form = ({ currentUser, userDataMap }) => {
  const defaultFormFields = userDataMap[currentUser.email].shippingAddress;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, country, county, city, address, zipCode, phoneNumber } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUserDocument(currentUser, formFields, "shippingAddress");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") alert("email already in use");
      console.log("user creation encountered an error", error);
    }
  };

  //item information

  const [itemFormFields, setItemFormField] = useState(itemDefaultFormFields);
  const { gender, title,  size,  brand, itemDescription, image, url } = itemFormFields;

  const [progress, setProgress] = useState(0);

  const itemHandleChange = (event) => {
    console.log(event);
    const { name, value} = event.target;
    setItemFormField({ ...itemFormFields, [name]: value });
    if (event.target.files) {
      setItemFormField({ ...itemFormFields, [name]: event.target.files[0] });
      setProgress(0);
    }
  };

  const itemHandleSubmit = async (event) => {
    event.preventDefault();
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    setItemFormField({ ...itemFormFields, item_id: small_id });

    try {
      await createItemsDocument(currentUser, itemFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") alert("email already in use");
      console.log("user creation encountered an error", error);
    }
  };

  const imageHandleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setItemFormField({ ...itemFormFields, url: downloadURL });
        });
      }
    );
  };
  return (
    <div className="sell-container">
      <h2>Drop your item</h2>
      <span>Give your wardrobe a second life.</span>

      <div className="shipping-info sell-container-form">
        <div className="shipping-container">
          <h3>Your seller shipping address</h3>
          <form onSubmit={handleSubmit}>
            <FormInput label="Name" required type="text" onChange={handleChange} name="name" value={name} />

            <FormInput label="Country" required type="text" onChange={handleChange} name="country" value={country} />

            <FormInput label="County" required type="text" onChange={handleChange} name="county" value={county} />
            <FormInput label="City" required type="text" onChange={handleChange} name="city" value={city} />
            <FormInput label="Address" required type="text" onChange={handleChange} name="address" value={address} />
            <FormInput label="Phone Number" required type="text" onChange={handleChange} name="phoneNumber" value={phoneNumber} />
            <FormInput label="Zip Code" required type="text" onChange={handleChange} name="zipCode" value={zipCode} />
            <Button type="submit">UPDATE</Button>
          </form>
        </div>
      </div>
      <h2>Your item info</h2>
      <div className=" sell-container-form">
        <form onSubmit={itemHandleSubmit}>
          <div className="title-form">
            <h3>Title:</h3>
            <FormInput label="Type your item's name" required type="input" onChange={itemHandleChange} name="title" value={title} />
          </div>
          <div className=" gender-form">
            <h3>Gender:</h3>
            <div className="radio">
              <label>
                <input type="radio" value="women" name="gender" checked={gender === "women"} onChange={itemHandleChange} />
                women
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="men" name="gender" checked={gender === "men"} onChange={itemHandleChange} />
                men
              </label>
            </div>
          </div>

          <div className="category-form dropdown ">
            <h3>Category</h3>
            <select className="dropdown-content dropbtn" as="select" defaultValue="Choose..." name="category" required onChange={itemHandleChange}>
              <option>Choose...</option>
              <option>sneakers</option>
              <option>clothes</option>
              <option>accessories</option>
            </select>
          </div>

          <div className="material-form ">
            <h3>Material</h3>
            <select as="select" defaultValue="Choose..." name="material" required onChange={itemHandleChange}>
              <option>Choose...</option>
              <option>Cotton</option>
              <option>Leather</option>
              <option>Polyester</option>
            </select>
          </div>

          <div className="size-form">
            <h3>Size</h3>
            <FormInput label="Choose your size" required type="input" onChange={itemHandleChange} name="size" value={size} />
          </div>

          <div className="color-form">
            <h3>Color</h3>
            <select as="select" defaultValue="Choose..." name="color" required onChange={itemHandleChange}>
              <option>Choose...</option>
              <option>Black</option>
              <option>Brown</option>
              <option>Burgundy</option>
              <option>Caramel</option>
              <option>Dark blue</option>
              <option>Fuchsia</option>
              <option>Gold</option>
              <option>Grey</option>
              <option>Green</option>
              <option>Khaki</option>
              <option>Orange</option>
              <option>Pink</option>
              <option>Purple</option>
              <option>Red</option>
              <option>Silver</option>
              <option>Turquoise</option>
              <option>White</option>
              <option>Yellow</option>
              <option>Print</option>
              <option>Multicolor</option>
            </select>
          </div>

          <div className="brand-item">
            <h3>Brand</h3>
            <FormInput label="What is the brand" required type="text" onChange={itemHandleChange} name="brand" value={brand} />
          </div>

          <div className="description-item">
            <h3>Item Description</h3>
            <textarea
              label="Choose your size"
              required
              type="text"
              onChange={itemHandleChange}
              name="itemDescription"
              rows="3"
              columns="52"
              value={itemDescription}
            />
          </div>
          <div>
            <h3>Price</h3>
            <CurrencyInput
              label="$"
              id="price"
              name="price"
              placeholder="Please enter a number"
              defaultValue={0}
              decimalsLimit={2}
              onChange={itemHandleChange}
            />
            ;
          </div>

          <div>
            <h3>Image</h3>
            <progress value={progress} max="100" />
            <input type="file" name="image" required onChange={itemHandleChange} />
            <img onClick={imageHandleUpload} src={url || "http://via.placeholder.com/300"} alt="firebase" />

            <Button onClick={imageHandleUpload}>Upload</Button>
          </div>

          <Button type="submit">SELL IT</Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
