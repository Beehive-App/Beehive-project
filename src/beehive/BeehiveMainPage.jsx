import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { startLogOut } from '../store/auth';

export const BeehiveMainPage = () => {


    const dispatch = useDispatch(); 

    const onLogOut= ()=>{ 
        dispatch(startLogOut()); 
    }

  return (
    <div>

        <Button onClick={onLogOut}>
            LOGOUT
        </Button>
        <Link to="/test">HSDOOHSDH</Link>


    </div>
  )
}
