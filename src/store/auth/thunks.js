import { sendEmailVerification } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/config";
import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/Providers";
import { checkCredentials,login,logout } from "./"

//Check if user is authenticated, disable buttons and other functions. 
export const checkingAuth = ()=>{
    return async (dispatch)=>{
        dispatch(checkCredentials());
    }
}

//Auth Via Google: 
export const startGoogleSignIn =()=>{
    return async(dispatch)=>{
       await dispatch(checkCredentials()); 
       const result = await signInWithGoogle();
       if(!result.ok) return dispatch( logout( result.errorMessage ) );
       dispatch(login(result));
    }
}

//Auth Via Email and password:
/* LOGIN */
export const startLoginWithEmailPassword = (email,password)=>{
    return async(dispatch,getState)=>{
        
        dispatch(checkCredentials());
        const {ok,uid,photoURL,displayName,emailVerified,errorMessage} = await loginUserWithEmailPassword({email,password}); 
        if (!ok) return dispatch(logout({errorMessage}));
        
        return dispatch(login({ok,uid,photoURL,email,displayName,emailVerified}));
    }
}

/* REGISTER */
export const startCreatingUserWithEmailPassword = ({displayName,email,password})=>{
    return async(dispatch)=>{
        //TODO: SEND EMAIL VERIFICATION LINK. 
        dispatch( checkCredentials() ); 
        const { ok, uid, photoURL,emailVerified,errorMessage }  = await registerUserWithEmailPassword({displayName,email,password}); 
        
        await sendEmailVerification(FirebaseAuth.currentUser); 

        if(!ok) return dispatch( logout({ errorMessage }) ); 
        dispatch( login({uid,displayName,email,photoURL,emailVerified}) ); 

    }
}

//Logout:
export const startLogOut =()=>{
    return async(dispatch)=>{
        await logoutFirebase();
        
        dispatch(logout()); 
        //TODO: CLEAR USER INFO AND TASKS....
    }
}
