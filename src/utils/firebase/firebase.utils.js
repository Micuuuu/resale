import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCpFqGsj0DBgNen-bP3RNcLamgIfKLKhnM",
  authDomain: "resale-db.firebaseapp.com",
  projectId: "resale-db",
  storageBucket: "resale-db.appspot.com",
  messagingSenderId: "353711806679",
  appId: "1:353711806679:web:4e234ba2d17105cc417892",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"

})

export const auth = getAuth();
export const sigInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  
//check if user data exist
  if(!userSnapshot.exists())
  {
    const {displayName, email} = userAuth;
    const  createdAt = new Date();
    
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    } catch (err) {
      console.log('error creating the user',err.message)
    }
  }
  
//if user data exist
  //return userdocref
//if user datda does not exist 
  //create / set the document with the data from userAuth in my collection

  return userDocRef;
}