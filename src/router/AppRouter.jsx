import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { HomeRoutes } from "../Home/routes/HomeRoutes"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { BeehiveRouter } from "../beehive/router/BeehiveRouter";
import { CheckingAuth } from "../global/components";
import { useSelect } from "@mui/base";
import { VerifyEmailPage } from "../global/Pages/VerifyEmailPage";
import { startLoadingUserSections } from "../store/Tasks/thunks";

export const AppRouter = () => {

//Podemos pasar esto a un custom hook.
const {status,emailVerified} = useSelector(state=>state.auth);
const dispatch = useDispatch();

useEffect(() => {
  
onAuthStateChanged( FirebaseAuth, async(user)=>{
    if (!user) return dispatch(logout());  
    
    const {uid,email,displayName,photoURL,emailVerified} = user; 

    dispatch(login({uid,email,displayName,photoURL,emailVerified})); 
    dispatch(startLoadingUserSections(uid)); 
  } );
}, []);

  
  if(status === 'checking') return <CheckingAuth />
  if(emailVerified === false) return <VerifyEmailPage />
  return (
    <Routes>
        {
          (status === 'authenticated') 
          ? <Route path="/*" element={<BeehiveRouter />}/> 
          : <Route path="home/*" element={<HomeRoutes />}/>
        }
        <Route path="/*" element={<Navigate to='/home' />}/>
    </Routes>
  )
}