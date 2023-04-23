import React,{useState, useEffect, useRef} from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import PodcastBox from "./PodcastBox";
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Dashboard() {

    const elementRef = useRef(null);
    const [arrowDisableLeft, setArrowDisableLeft] = useState(true);
    const [arrowDisableRight, setArrowDisableRight] = useState(false);


    const {baseURL}=useAuth();
    const [allPodcast, setAllPodcast]=useState([]);
    const [loading, setLoading]=useState(true)
    const [error, setError] = useState(null)

    const handleHorizantalScroll = (element, speed, distance, step) => {
      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
        if (element.scrollLeft === 0) {
          setArrowDisableLeft(true);
        } else {
          setArrowDisableLeft(false);
        }
        if (element.scrollRight === 0) {
          setArrowDisableRight(true);
        } else {
          setArrowDisableRight(false);
        }
      }, speed);
    };

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
            <div className="flex justify-between scroll-smooth">
            <IconButton
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 10, 100, -20);
              }}
              disabled={arrowDisableLeft}
            >
              <ArrowCircleLeftIcon/>
            </IconButton>
            <IconButton
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 10, 100, 20);
              }}
              disabled={arrowDisableRight}
            >
              <ArrowCircleRightIcon/>
            </IconButton>
            </div>
            <div ref={elementRef} className="flex overflow-x-auto gap-4">
                {allPodcast.map((item)=>{
                    return <div key={item._id}>
                      <PodcastBox 
                      podcastName={item.podcastName} 
                      speakerName={item.speakerName}
                      description={item.podcastDes}
                      type={item.type}
                      fileURL={item.fileURL}
                      thumbnailURL={item.thumbnailURL}
                      baseURL={baseURL}
                      />
                    </div>;
                })}
            </div>
            
            <Navbar />
            <div className=""></div>
            <Sidebar />
            </>)}
            
        </>
    )
}