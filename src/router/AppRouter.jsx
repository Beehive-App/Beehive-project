import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { HomeRoutes } from "../Home/routes/HomeRoutes"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { BeehiveRouter } from "../beehive/router/BeehiveRouter";

export const AppRouter = () => {

  //Podemos pasar esto a un custom hook.
  const {status} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    
  onAuthStateChanged( FirebaseAuth, async(user)=>{
      if (!user) return dispatch(logout()); 

      const {uid,email,displayName,photoURL} = user; 

      dispatch(login({uid,email,displayName,photoURL})); 
    } );
  }, [])
  

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
