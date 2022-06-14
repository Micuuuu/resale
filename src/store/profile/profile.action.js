import createAction from "../../utils/reducer/reducer.utils";
import { PROFILE_ACTION_TYPES } from "./profile.types";

export const setIsProfileDropdownOpen = (isProfileDropdownOpen) => 
    createAction(PROFILE_ACTION_TYPES.SET_IS_PROFILE_OPEN, isProfileDropdownOpen)
