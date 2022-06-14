import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import CurrencyInput from "react-currency-input-field";

import { useSelector } from "react-redux";
import { selectUserDataMap } from "../../store/user-data/user-data.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { updateUserDocument } from "../../utils/firebase/firebase.utils";
import { createItemsDocument } from "../../utils/firebase/firebase.utils";

import { storage } from "../../utils/firebase/firebase.utils";

import "./sell-form.styles.scss";

import Button from "../button/button.component";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Form from "./form/form.component";

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

const SellForm = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userDataMap = useSelector(selectUserDataMap);

  return currentUser && userDataMap ? <Form currentUser={currentUser} userDataMap={userDataMap} /> : <div>Loading</div>;
};

export default SellForm;
