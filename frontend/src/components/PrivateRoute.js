import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props){
    const {currentUser}=useAuth();
    return currentUser? props.children: <Navigate to='/login'/>
}