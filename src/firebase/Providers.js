import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider(); //

export const signInWithGoogle = async () =>{

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider); 

        // const credentials = GoogleAuthProvider.credentialFromResult( result ); 
        const {displayName, email, photoURL, uid} = result.user; 

        return {
            ok:true,
            displayName,email,photoURL,uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok:false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({displayName,email,password})=>{

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password); 
        const {uid,photoURL,emailVerified} = resp.user;  
        await updateProfile( FirebaseAuth.currentUser, { displayName } );
        return {ok:true , uid,photoURL,email,displayName,emailVerified }

    } catch (error) {

        console.warn({error})

        return {ok: false, errorMessage: error.message}
    }

}

export const loginUserWithEmailPassword = async({email,password})=>{
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password); 

        console.log({resp});

        const {displayName,uid,photoURL,emailVerified} = resp.user;  
        
        return {ok: true, uid,photoURL,email,displayName,emailVerified}

    } catch (error) {
        console.warn(error)
        return {ok: false, errorMessage: (error.code === 'auth/user-not-found') ?'El usuario no existe' :(error.code === 'auth/wrong-password') ?'Contraseña incorrecta':'Error al iniciar sesión',}
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut(); 
}