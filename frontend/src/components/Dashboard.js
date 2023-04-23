import React,{useState, useEffect, useRef} from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import PodcastBox from "./PodcastBox";


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
    }, [])


    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && allPodcast && (<>
            <div>
                {allPodcast.map((item)=>{
                    return <div key={item._id}>{item.podcastName}
                    {item.type==="audio"?(
                    <audio controls>
                        <source src={baseURL+"/"+item.fileURL} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>):(
                        <video controls>
                            <source src={baseURL+"/"+item.fileURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    </div>;
                })}
            </div>
            <PodcastBox />
            <Navbar />
            <div className=""></div>
            <Sidebar />
            </>)}
            
        </>
    )
}