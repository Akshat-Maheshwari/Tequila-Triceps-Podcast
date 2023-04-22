import React,{useState, useEffect} from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import ReactPlayer from 'react-player'


export default function Dashboard() {

    const {baseURL}=useAuth();
    const [allPodcast, setAllPodcast]=useState([]);

    useEffect(() => {
      return () => {
        axios.get(baseURL+'/podcast')
          .then(function (response) {
            setAllPodcast(response.data);
          })
      }
    }, [])
    

    return (
        <>
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
            <Navbar />
            <div className=""></div>
            <Sidebar />
        </>
    )
}