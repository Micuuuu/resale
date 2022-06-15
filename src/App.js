import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { getUserData } from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOutPage from "./routes/checkOut/checkOut.component";
import SellForm from "./components/sell-form/sell-form.component";
import ProfileInfo from "./components/profile-page-info/profile-page-info";
import MyProfileInfo from "./components/my-profile/my-profile.components";
import { setCurrentUser } from "./store/user/user.action";
//User firebase data
import { setUserData } from "./store/user-data/user-data.action";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDataMap = async () => {
      const userDataArray = await getUserData();

      dispatch(setUserData(userDataArray));
    };
    return getUserDataMap();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));

    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/profile/:id/dressing" element={<ProfileInfo page={"dressing"} />} />
        <Route path="/profile/:id/sold" element={<ProfileInfo page={"sold-items"} />} />
        <Route path="/my-profile/:id/dressing" element={<MyProfileInfo page={"dressing"} />} />
        <Route path="/my-profile/:id/to-ship" element={<MyProfileInfo page={"to-shipp"} />} />
        <Route path="/my-profile/:id/orders" element={<MyProfileInfo page={"orders"} />} />
        <Route path="/my-profile/:id/settings" element={<MyProfileInfo page={"settings"} />} />
      </Route>
    </Routes>
  );
}

export default App;
