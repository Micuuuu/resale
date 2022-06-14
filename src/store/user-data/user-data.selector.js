import { createSelector } from "reselect";

const selectUserDataReducer = (state) =>  state.userData;    
const selectUserData = createSelector(
    [selectUserDataReducer], // the imput selector
    (userDataSlice) => {
        return userDataSlice.userData} //the output selector
)

export const selectUserDataMap = createSelector(
    [selectUserData],
    (elements) => { 
        return elements.reduce((acc, elm) =>{
        const {email, displayName, createdAt, photoURL, shippingAddress, uid, followersCount,following,
        } = elm

        acc[email.toLowerCase()] ={uid, email, displayName, createdAt, photoURL,shippingAddress,followersCount, following
        };
        return acc;
      }, {} );
     }
);


export const selectUserDataMapById = createSelector(
    [selectUserData],
    (elements) => { 
        return elements.reduce((acc, elm) =>{
        const {email, displayName, createdAt, photoURL, shippingAddress, uid, followersCount,following,soldItemsCount
        } = elm

        acc[uid] ={uid, email, displayName, createdAt, photoURL,shippingAddress,followersCount, following, soldItemsCount
        }; 
        return acc;
      }, {} );
     }
);

export const selectFollowersData = createSelector(
    [selectUserData],
    (elements) => { 
        return elements.reduce((acc,elm) =>{
        const {following, email
        } = elm

        acc[email.toLowerCase()] =following;
        
        return acc;
      }, {} );
     }
);