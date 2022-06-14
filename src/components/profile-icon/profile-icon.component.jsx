import { ReactComponent as Profile } from "../../assets/profile.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectIsProfileDropdownOpen } from "../../store/profile/profile.selector";
import { setIsProfileDropdownOpen } from "../../store/profile/profile.action";
import "./profile-icon.styles.scss";

const ProfileIcon = () => {
  const dispatch = useDispatch();
  const isProfileDropdownOpen = useSelector(selectIsProfileDropdownOpen);
  const toggle = () => {
    // console.log("deschidem");

    dispatch(setIsProfileDropdownOpen(!isProfileDropdownOpen));
  };
  return (
    <div className="profile-icon-container" onClick={toggle}>
      <Profile className="profile-icon" />
    </div>
  );
};

export default ProfileIcon;
