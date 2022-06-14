import { createContext } from "react";
import { useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
//as the actual value you want to acces
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import createAction from "../utils/reducer/reducer.utils";
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const userReducer = (state, action) =>
{
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default: 
            throw new Error (`Unhandled type ${type} in userReducer`);
    }
    
} 
const INITIAL_STATE = {
    currentUser: null
}
export const UserProvider = ({children}) =>{
    //const [currentUser, setCurrentUser] = useState(null);
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)  // USE REDUCER primeste functia noastra Reduce si valoarea initiala a lui State
    // iar dupa rulare primim state-ul si dispatch
    //dispatcg function -  de fiecare data cand vrem ca UserReducer-ul nostru sa primeasca o actiune trebuie sa apelam aceasta functie
    
   const setCurrentUser = (user) => {
       dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)) 
   }
   const value = {currentUser, setCurrentUser}
    useEffect(()=>{
        const unsubscribe =  onAuthStateChangedListener ((user) =>{
           if(user){
            createUserDocumentFromAuth(user);
           }
            setCurrentUser(user)
        });
        return unsubscribe;
    }, []);
  
    return <UserContext.Provider value = {value}> {children}</UserContext.Provider>
}