import React,{useState, useEffect, useRef} from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import PodcastContainer from "./PodcastContainer";
import PodcastBox from "./PodcastBox"



export default function Dashboard() {
    const {baseURL}=useAuth();
    const [allPodcast, setAllPodcast]=useState([]);
    const [loading, setLoading]=useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      return () => {
        axios.get(baseURL+'/podcast')
          .then(function(response) {
            setAllPodcast(response.data);
            setError(null);
          })
          .catch((err)=>{
            setError(err.message)
            setAllPodcast(null)
          }).finally(()=>{
            setLoading(false)
          })
      }
    }, [baseURL])


    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && allPodcast && (<>
            <Navbar />
            <div className="flex flex-col gap-20 mb-28">
            <PodcastContainer title={"Most Popular and Trending"} array={allPodcast} right={true}/>
            <PodcastContainer title={"Favourite"} array={allPodcast}/>
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