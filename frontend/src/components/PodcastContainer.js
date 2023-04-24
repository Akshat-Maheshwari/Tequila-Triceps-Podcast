import React, {useState, useRef} from 'react'
import PodcastBox from './PodcastBox';
import { useAuth } from '../contexts/AuthContext';
import Typography from '@mui/material/Typography';;

export default function PodcastContainer(props) {

    const {baseURL}=useAuth();
    const elementRef = useRef(null);
  return (
    <>
    <div className='flex justify-between'>
    {props.right && <div className='flex'>
    <div className='text-center flex align-middle pl-8'>
      <Typography variant="h4" component="div" gutterBottom  style={{transform: "rotate(180deg)", writingMode: "vertical-rl", whiteSpace: "nowrap"}}>{props.title}</Typography>
    </div>
    </div>}
    <div className={`w-11/12 p-2 bg-gray-200 rounded-3xl mt-1 ${props.right?"rounded-e-none mr-0":"rounded-s-none ml-0"}`}>
            <div ref={elementRef} className="flex overflow-x-auto gap-4 scrollbar-hide">
                {props.array.map((item)=>{
                 return props.fav.some(obj => obj._id === item._id)?(
                    <div key={item._id}>
                      <PodcastBox 
                      podcastName={item.podcastName} 
                      speakerName={item.speakerName}
                      description={item.podcastDes}
                      type={item.type}
                      fileURL={item.fileURL}
                      baseURL={baseURL}
                      thumbnailURL={item.thumbnailURL}
                      id={item._id}
                      fav={true}
                      />
                    </div>
                  ):(<div key={item._id}>
                      <PodcastBox 
                      podcastName={item.podcastName} 
                      speakerName={item.speakerName}
                      description={item.podcastDes}
                      type={item.type}
                      fileURL={item.fileURL}
                      baseURL={baseURL}
                      thumbnailURL={item.thumbnailURL}
                      id={item._id}
                      fav={false}
                      />
                    </div>)
                   
                })}
            </div>
    </div>
    {!props.right && <div className='flex'>
    <div className='text-center flex align-middle pr-8'>
      <Typography variant="h4" component="div" gutterBottom  style={{transform: "rotate(360deg)", writingMode: "vertical-rl", whiteSpace: "nowrap"}}>{props.title}</Typography>
    </div>
    </div>}
    </div>
    </>
  )
}
