import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "resale-db.firebaseapp.com",
  projectId: "resale-db",
  storageBucket: "resale-db.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef =  collection(db, collectionKey)
  const batch = writeBatch(db);   //!TRANZACTII
    objectsToAdd.forEach(element => {
      const docRef = doc(collectionRef, element.title.toLowerCase());
      batch.set(docRef, element) 
    });

    await batch.commit()
    console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef= collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
  // .reduce((acc, docSnapshot) =>{
  //   const {title, items} = docSnapshot.data()
  //   acc[title.toLowerCase()] =items;
  //   return acc;
  // }, {}  );

  //return categoryMap;
}
export const createUserDocumentFromAuth = async (userAuth, aditionalData) =>{
  const userDocRef = doc(db, 'users', userAuth.uid)

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
        createdAt,
        ...aditionalData
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

export const getAuthWithEmailAndPassword =async (email,password) =>{
if(!email || !password) return;
const response = createUserWithEmailAndPassword(auth,email,password)
return response
}

export const SignInAuthWithEmailAndPassword =async (email,password) =>{
  if(!email || !password) return;
  const response = signInWithEmailAndPassword(auth,email,password)
  return response
  }

export const SignOutUser = async ()  => signOut(auth)

export const onAuthStateChangedListener = (callback)  => 
{
  onAuthStateChanged(auth, callback)
}