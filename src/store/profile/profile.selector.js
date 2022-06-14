import {createSelector} from 'reselect';
export const  selectProfileReducer = state =>{

return state.profileIcon;
}
export const selectIsProfileDropdownOpen = createSelector([selectProfileReducer], (profileIcon) =>  profileIcon.isProfileDropdownOpen
)