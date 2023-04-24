import React,{useState, useEffect, useRef} from "react"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import PodcastContainer from "./PodcastContainer";



export default function Dashboard() {
    const {baseURL, currentUser}=useAuth();
    const [allPodcast, setAllPodcast]=useState([]);
    const [popular, setPopular]=useState([]);
    const [recent, setRecent]=useState([]);
    const [favorite, setFavorite]=useState([]);
    const [favoritePod, setFavoritePod]=useState([]);
    const [loading, setLoading]=useState(true)
    const [error, setError] = useState(null)
    const [toggle,setToggle] = useState(false)
    function handleData(data){
      setAllPodcast(data);
      data.sort((a, b) => b.count - a.count);
      let popularTemp= data.length > 5 ? data.slice(0, 5) : data;
      setPopular(popularTemp)
      data.sort((a, b) => b.createdAt-a.createdAt);
      setRecent(data);
    }
    
    async function getPodcast(){
      // console.log("inside axios", baseURL+'/podcast')
        await axios.get(baseURL+'/podcast')
          .then(function(response) {
            // console.log("podcast get req");
            // console.log(response.data)
            handleData(response.data);
            setError(null);
          })
          .catch((err)=>{
            setError(err.message)
          }).finally(()=>{
            // console.log("loading done")
            setLoading(false)
          })
    }
    // console.log("outside useEffect")
    useEffect(() => {
      // console.log("inside use effect")
       getPodcast();
    }, [])

    async function getFav(){
      await axios.get(baseURL+'/favorite', { params:{email:currentUser.email}})
      .then(response => {
        setFavorite(response.data)
        if(allPodcast.length>0){
          const filteredArray = allPodcast.filter(obj => {
            const matchingIdObject = favorite.find(idObj => idObj.id === obj._id);
            return matchingIdObject !== undefined;
          });
          setFavoritePod(filteredArray);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
    useEffect(() => {
       getFav();
    }, [])

    


    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && allPodcast.length && (<>
            <Navbar />
            <div className="flex flex-col gap-20 mb-28">
            
            <PodcastContainer title={"Most Popular and Trending"} fav={favoritePod} array={popular} right={true}/>
            <PodcastContainer title={"Recently Added"} fav={favoritePod}  array={recent}/>
            {favoritePod.length>0 && <PodcastContainer fav={favoritePod} title={"Favourite"} right={true} array={favoritePod}/>}
            </div>
            {/* <PodcastBox 
                      podcastName={allPodcast[0].podcastName} 
                      speakerName={allPodcast[0].speakerName}
                      description={allPodcast[0].podcastDes}
                      type={allPodcast[0].type}
                      fileURL={allPodcast[0].fileURL}
                      baseURL={baseURL}
                      /> */}
            
            </>)}
            
        </>
    )
}