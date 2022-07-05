import FormInput from "../../form-input/form-input.component";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ShippingForm from "../../shipping-form/shipping-form.component";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";

import { createItemsDocument } from "../../../utils/firebase/firebase.utils";

import { storage } from "../../../utils/firebase/firebase.utils";

import Button from "../../button/button.component";

import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./fomr.styles.scss"
const itemDefaultFormFields = {
  title: "",
  gender: "",
  category: "select an item ",
  size: "",
  brand: "",
  color: "",
  material: "",
  itemDescription: "",
  image: "",
};

const Form = ({ currentUser, userDataMap }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const unique_id = uuid();



  //item information

  const [itemFormFields, setItemFormField] = useState(itemDefaultFormFields);
  const { gender, title,  size,  brand, itemDescription, image, url, price } = itemFormFields;

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

    function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
        setIsUploaded(true);
      };
      if (e.target.files) {
        setImageUrl(e.target.files[0])
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  }


  const imageHandleUpload = () => {
    
    const storageRef = ref(storage, `images/${unique_id + imageUrl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
       
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
          setImagePreview (imagePreview)
          setIsUploaded(false)
        });
      }
    );
  };

  return (
    <div className="sell-container">
      <h2>Drop your item</h2>
      <span>Give your wardrobe a second life.</span>
      <ShippingForm onSubmit = {(e) => {console.log( e.target.value)}} tipe = "sell" id= {currentUser.uid} title = {"Your seller shipping address"}/>
      {/* <div className="shipping-info sell-container-form">
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
      </div> */}
      <div className=" sell-container-form">
      <h2>Your item info</h2>
        <form onSubmit={itemHandleSubmit}>
          
            <FormInput label="Type your item name" required type="input" onChange={itemHandleChange} name="title" value={title} />
          
         
              <select as="select" required className="dropdown-content dropbtn" defaultValue="Choose..." name="gender"  onChange={itemHandleChange}>
              <option>Choose gender...</option>
              <option>Women</option>
              <option>Men</option>
            </select>
          

         
            <select className="dropdown-content dropbtn" as="select" defaultValue="Choose..." name="category" required onChange={itemHandleChange}>
              <option>Choose category...</option>
              <option>sneakers</option>
              <option>clothes</option>
              <option>accessories</option>
            </select>
          

          
            <select as="select" className="dropdown-content dropbtn" defaultValue="Choose..." name="material" required onChange={itemHandleChange}>
              <option>Choose material...</option>
              <option>Cotton</option>
              <option>Leather</option>
              <option>Polyester</option>
            </select>
          

                
            <select as="select" className="dropdown-content dropbtn" defaultValue="Choose your size.." name="size" required onChange={itemHandleChange}>
              <option>Choose your size...</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          

          
            <select as="select" className="dropdown-content dropbtn" defaultValue="Choose..." name="color" required onChange={itemHandleChange}>
              <option>Choose color...</option>
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
          

          
            <FormInput label="What is the brand" required type="text" onChange={itemHandleChange} name="brand" value={brand} />
          

          
          <FormInput label="Type your item description" required type="input" onChange={itemHandleChange} name="itemDescription" value={itemDescription} />
          
          
          
           
          <FormInput label="Type your item price"  required type="number" step="0.01" onChange={itemHandleChange} name="price" value={price} />

          

        

          <div className="settings-image-upload-container">
        <h2>Upload Image: </h2>

        <div className="settings-image-upload-box">
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <div className="settings-image-preview">
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImagePreview(null);
                  }}
                />
              
                  <img
                    id="uploaded-image"
                    src={imagePreview}
                    draggable={false}
                    alt="uploaded-img"
                  />
                
              </div>
            )}
          </div>
        </div>

        
        <Button buttonType="inverted" onClick={imageHandleUpload}>UPLOAD</Button>

        
      </div>

          <Button type="submit" isLoading= {isUploaded} >SELL IT</Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
