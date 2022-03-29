import {sigInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
const SignIn =() =>{
    const logGoogleUser = async () =>{
        const response = await sigInWithGooglePopup();
        createUserDocumentFromAuth(response.user);
       
    }
    
    return (
        <div>
            <h1>Sig in page uhuu</h1>
            <button onClick ={logGoogleUser}>
                Sig in with google PopUp
            </button>
        </div>
    )
};




export  default SignIn