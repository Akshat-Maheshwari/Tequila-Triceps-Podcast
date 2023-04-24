import React,{useState, useEffect, useRef} from "react"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import PodcastContainer from "./PodcastContainer";
import PodcastBox from "./PodcastBox"



export default function Dashboard() {
    const {baseURL, currentUser}=useAuth();
    const [allPodcast, setAllPodcast]=useState([]);
    const [popular, setPopular]=useState([]);
    const [recent, setRecent]=useState([]);
    const [favorite, setFavorite]=useState([]);
    const [favoritePod, setFavoritePod]=useState([]);
    const [loading, setLoading]=useState(true)
    const [error, setError] = useState(null)
    function handleData(data){
      setAllPodcast(data);
      data.sort((a, b) => b.count - a.count);
      let popularTemp= data.length > 5 ? data.slice(0, 5) : data;
      setPopular(popularTemp)
      data.sort((a, b) => b.createdAt-a.createdAt);
      setRecent(data);
    }

    useEffect(() => {
      return async () => {
        await axios.get(baseURL+'/podcast')
          .then(function(response) {
            handleData(response.data);
            setError(null);
          })
          .catch((err)=>{
            setError(err.message)
            setAllPodcast(null)
          }).finally(()=>{
            setLoading(false)
          })

          axios.get(baseURL+'/favorite', { params: { email: currentUser.email } })
          .then(response => {
            setFavorite(response.data)
          })
          .catch(error => {
            console.error(error);
      });
      if(allPodcast.length>0){
        const filteredArray = allPodcast.filter(obj => {
          const matchingIdObject = favorite.find(idObj => idObj.id === obj._id);
          return matchingIdObject !== undefined;
        });
        setFavoritePod(filteredArray);
      }
      }
    }, [baseURL, allPodcast])



    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && allPodcast && (<>
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