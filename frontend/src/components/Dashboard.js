import React, {useState, useEffect} from "react"
import Navbar from "./Navbar"
import useAuth from '../hooks/useAuth';
import useFav from '../hooks/useFav';
import PodcastContainer from "./PodcastContainer";
import useAxios from "../hooks/useAxios";
import { createCopy } from "../utility/helper";

export default function Dashboard(){
  const {baseURL,currentUser}=useAuth();
  const [favoritePod,setFavoritePod]=useFav();
  const [podLoad,podError,podData, podFire]=useAxios("get",baseURL+'/podcast');
  const [favLoad,favError,favData, favFire]=useAxios("get",baseURL+'/favorite', { params:{email:currentUser.email}});
  const [popular,setPopular]=useState([]);
  const [recent,setRecent]=useState([]);
  const [favorite,setFavorite]=useState([]);
  
  useEffect(()=>{
    podFire();
    favFire();
  },[])
  useEffect(() => {
    if(podData) populateRest();
    if(favData && podData) populateFav();
  }, [favData,podData])

  useEffect(()=>{
    setFavorite(Object.values(favoritePod));
  },[favoritePod])

  function populateRest(){
    podData.sort((a, b) => b.count - a.count);
    setPopular(createCopy(podData.length > 5 ? podData.slice(0, 5) : podData));
    setRecent(createCopy(podData.toSorted((a, b) => b.createdAt-a.createdAt)));
  }
  function populateFav(){
    const favObj={};
    favData.forEach((obj)=>favObj[obj.id]={});
    podData.forEach((obj)=>favObj[obj._id] && (favObj[obj._id]=obj));
    setFavoritePod(favObj);
  }

  if(podLoad || favLoad) return <h1>Loading...</h1>;
  if(podError || (favError && favError.response.status!=404)) return <h1>Something went wrong</h1>;
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20 mb-28">
        <PodcastContainer title={"Most Popular and Trending"} array={popular} right={true} />
        <PodcastContainer title={"Recently Added"} array={recent} />
        {
        Object.keys(favoritePod).length>0 && 
        <PodcastContainer title={"Favourite"} array={favorite} right={true} />
        }
      </div>
    </>
  )
}