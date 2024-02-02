import React,{useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAuth from '../hooks/useAuth';
import useFav from "../hooks/useFav";
import useAxios from "../hooks/useAxios";
import { createCopy } from '../utility/helper';

function FavButton({fav, item}) {
    const {baseURL, currentUser}=useAuth();
    const [favoritePod,setFavoritePod]=useFav();
    const postParams=[baseURL+"/api/favorite",
        {
            email: currentUser.email,
            id: item._id
        },
        {
            headers:{
            'Content-Type': 'application/json'
            }
        }]
    const [loading,error,res,fire]=useAxios("post",...postParams);
    function handleFav(){
        fire();
    }
    useEffect(()=>{
        if(res) addToList();
    },[res])
    function addToList(){
        const copy=createCopy(favoritePod);
        if(favoritePod[item._id]) delete copy[item._id];
        else copy[item._id]=item;
        setFavoritePod(copy);
    }
    if(error) console.log(error);
  return (
    <>
        <IconButton onClick={handleFav} sx={{color:fav?"red":"grey"}} aria-label="add to favorites" disabled={loading || error}>
            <FavoriteIcon />
        </IconButton>
    </>
  )
}

export default FavButton