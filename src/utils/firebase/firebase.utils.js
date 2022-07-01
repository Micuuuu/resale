import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  increment,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, //
  authDomain: "resale-db.firebaseapp.com",
  projectId: "resale-db",
  storageBucket: "resale-db.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const sigInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const storage = getStorage();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); //!TRANZACTII
  objectsToAdd.forEach((element) => {
    const docRef = doc(collectionRef, element.title.toLowerCase());
    batch.set(docRef, element);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "items");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  //din curs
  // .reduce((acc, docSnapshot) =>{
  //   const {title, items} = docSnapshot.data()
  //   acc[title.toLowerCase()] =items;
  //   return acc;
  // }, {}  );

  //return categoryMap;
};

export const getUserData = async () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  // .reduce((acc, docSnapshot) =>{
  //   const {title, items} = docSnapshot.data()
  //   acc[title.toLowerCase()] =items;
  //   return acc;
  // }, {}  );

  //return categoryMap;
};
export const createUserDocumentFromAuth = async (userAuth, aditionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const uid = userAuth.uid;
  const userSnapshot = await getDoc(userDocRef);

  //check if user data exist
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        uid,
        displayName,
        email,
        createdAt,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/resale-db.appspot.com/o/images%2FPngItem_1503945.png?alt=media&token=0d33f901-39f1-4c6c-b729-c8c89f31a766",
        ...aditionalData,
        shippingAddress: {
          name: "",
          country: "",
          county: "",
          city: "",
          address: "",
          zipCode: "",
          phoneNumber: "",
        },
        followersCount: 0,
        following: [],
        soldItemsCount: 0,
        soldItems: [],
        orderList: [],
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  //if user data exist
  //return userdocref
  //if user datda does not exist
  //create / set the document with the data from userAuth in my collection

  return userDocRef;
};

export const updateUserDocument = async (userAuth, aditionalData, name) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  if (name === "shippingAddress") {
    try {
      await updateDoc(userDocRef, { shippingAddress: aditionalData });
      return true;
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  if (name === "photoURL") {
    try {
      await updateDoc(userDocRef, { photoURL: aditionalData });
    } catch (err) {
      console.log("ERROR ADDING PROFILE image", err.message);
    }
  }
};

export const updateUserFollowersCount = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth);
  try {
    const response = await updateDoc(userDocRef, { followersCount: increment(1) });
    console.log(response);
  } catch (err) {
    console.log("error", err.message);
  }
};

export const updateUserSoldItemsCount = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth);
  try {
    const response = await updateDoc(userDocRef, { soldItemsCount: increment(1) });
    console.log(response);
  } catch (err) {
    console.log("error", err.message);
  }
};

export const updateUserFollowingList = async (userAuth, aditionalData) => {
  const userDocRef = doc(db, "users", userAuth);

  try {
    const response = await updateDoc(userDocRef, "following", arrayUnion(aditionalData));
    console.log(response);
  } catch (err) {
    console.log("error", err.message);
  }
};

export const updateUserSoldItemList = async (userAuth, aditionalData) => {
  const userDocRef = doc(db, "users", userAuth);

  try {
    const response = await updateDoc(userDocRef, "soldItems", arrayUnion(aditionalData));
    console.log(response);
  } catch (err) {
    console.log("error", err.message);
  }
};

export const updateUserOrderList = async (userAuth, aditionalData) => {
  const userDocRef = doc(db, "users", userAuth);

  try {
    const response = await updateDoc(userDocRef, "orderList", arrayUnion(aditionalData));
    console.log(response);
  } catch (err) {
    console.log("error", err.message);
  }
};

export const createItemsDocument = async (userDoc, aditionalData) => {
  const { price, gender, title, category, material, size, color, brand, itemDescription, url, item_id } = aditionalData;

  const { uid, email } = userDoc;
  const DocRef = doc(db, "items", category);
  const createdAt = new Date();

  try {
    await updateDoc(DocRef, {
      items: arrayUnion({
        createdAt: createdAt,
        id: item_id,
        price: price,
        owner: { uid, email },
        gender: gender,
        name: title,
        material: material,
        size: size,
        color: color,
        brand: brand,
        itemDescription: itemDescription,
        imageUrl: url,
        category: category,
      }),
    });
  } catch (err) {
    console.log("error creating the user", err.message);
  }
};

export const updateItemsDocument = async (category, updates, defaults) => {
  const userDocRef = doc(db, "items", category);
  const { price, gender, title, material, size, color, brand, itemDescription, url, item_id, owner, createdAt } = updates;
  console.log(updates);
  console.log(defaults);

  try {
    await updateDoc(userDocRef, { items: arrayRemove(defaults) });
    await updateDoc(userDocRef, { items: arrayUnion(updates) });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteItemsDocument = async (category, defaults) => {
  const userDocRef = doc(db, "items", category);
  try {
    await updateDoc(userDocRef, { items: arrayRemove(defaults) });
  } catch (err) {
    console.log("error creating the user", err.message);
  }
};
export const getAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const response = createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const SignInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const response = signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const SignOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

getUserData();
