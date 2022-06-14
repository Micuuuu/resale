import { PROFILE_ACTION_TYPES } from "./profile.types";

const PROFILE_INITIAL_STATE = {
  isProfileDropdownOpen: false,
  }


  export const profileReducer = (state = PROFILE_INITIAL_STATE, action = {}) =>{
    const {type, payload} = action;
  
    switch(type){
      case  PROFILE_ACTION_TYPES.SET_IS_PROFILE_OPEN:
      return {
         
          isProfileDropdownOpen: payload,
        }
      default:
        return state;
    }
  }