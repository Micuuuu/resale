import React, { useState } from "react";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import ShippingForm from "../shipping-form/shipping-form.component";
import { useSelector } from "react-redux";
import { selectUserDataMapById } from "../../store/user-data/user-data.selector";
import { v4 as uuid } from "uuid";

import { updateUserDocument } from "../../utils/firebase/firebase.utils";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

  import { storage } from "../../utils/firebase/firebase.utils";
import "./profile-settings.styles.scss"
const ProfileSettings = ({id}) => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const unique_id = uuid();
  const userDataMapById = useSelector(selectUserDataMapById);

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };
      if (e.target.files) {
        setImageUrl(e.target.files[0])
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  }


  const imageHandleUpload = () => {
    
    const storageRef = ref(storage, `profile-images/${unique_id + imageUrl.name}`);
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
          //setItemFormField({ ...itemFormFields, url: downloadURL });
          
          setImage (image)
          updateUserDocument(userDataMapById[id], downloadURL, "photoURL")
          setIsUploaded(false)
        });
      }
    );
  };

  return (
    <div className="setting-layout">
      <div className="settings-image-upload-container">
        <h2>Edit Profile Image: </h2>

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
                    setImage(null);
                  }}
                />
              
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                
              </div>
            )}
          </div>
        </div>

        
        <Button buttonType="inverted" onClick={imageHandleUpload}>UPDATE</Button>

        
      </div>
      <ShippingForm id={id} title = "Shipping / Billing address"/>

      
    </div>
  );
}

export default ProfileSettings;