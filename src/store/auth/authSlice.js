import { createSlice } from '@reduxjs/toolkit';
    export const authSlice = createSlice({
        name: 'auth',
        initialState: {
            status:'checking', //not-authenticated , authenticated, checking
            uid:null,
            email:null,
            displayName:'',
            photoURL:null,
            errorMessage:null,
            emailVerified:null,
        },
    reducers: {
        login:(state,{payload})=>{
            state.status        = 'authenticated';
            state.uid           = payload?.uid; 
            state.displayName   = payload?.displayName;
            state.email         = payload?.email;
            state.photoURL      = payload?.photoURL;
            state.errorMessage  = payload?.errorMessage;
            state.emailVerified = payload?.emailVerified;
        },
        logout:(state,{payload})=>{
            state.status        = 'not-authenticated';
            state.uid           = null; 
            state.email         = null;
            state.displayName   = null;
            state.photoURL      = null;
            state.emailVerified = null;
            state.errorMessage  = payload?.errorMessage;
        },
        checkCredentials:(state)=>{
            state.status = 'checking'; 
        }
    }
});
export const { checkCredentials,logout,login } = authSlice.actions;