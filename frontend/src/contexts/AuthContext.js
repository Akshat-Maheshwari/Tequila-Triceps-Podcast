import React, {createContext, useEffect, useState} from 'react'
import {auth} from '../firebase'

export const AuthContext=createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser]= useState();
    const [loading, setLoading] = useState(true);
    const baseURL="https://backend-jxv0.onrender.com";
    // const baseURL="http://localhost:3001";

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut();
    }

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    
    const value={
        currentUser,
        signup,
        login,
        logout,
        baseURL
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  );
}


