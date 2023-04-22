import React,{useState} from "react"
import {useAuth} from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const [error, setError]= useState();
    const {currentUser, logout} = useAuth();
    const navigate= useNavigate();

    async function handleLogout(e){
        e.preventDefault();
        try{
            setError('')
           await logout();
           navigate('/login')
        } catch(err){
            console.log(err.message)
            setError(err.message)
        }
    }

  return (
    <>
            <div>{currentUser.email}</div>
            <div className="relative">
                <button onClick={handleLogout} className="bg-blue-500 text-white rounded-md px-2 py-1">Log Out</button>
            </div>
            {error && <div className="text-center p-2 mt-1" >{error}</div>}
    </>
  )
}
