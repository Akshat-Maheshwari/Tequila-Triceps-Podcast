import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useAuth from '../hooks/useAuth';
import PodcastBox from './PodcastBox';

export default function MyCarousel(props) {
    const {baseURL}=useAuth();
  return (
    <div style={{width:"50%", margin:"auto"}}>
        <Carousel showThumbs={false} >
                <PodcastBox
                      podcastName={props.array[0].podcastName} 
                      speakerName={props.array[0].speakerName}
                      description={props.array[0].podcastDes}
                      type={props.array[0].type}
                      fileURL={props.array[0].fileURL}
                      baseURL={baseURL}
                      />
                <div>
                <PodcastBox 
                      podcastName={props.array[1].podcastName} 
                      speakerName={props.array[1].speakerName}
                      description={props.array[1].podcastDes}
                      type={props.array[1].type}
                      fileURL={props.array[1].fileURL}
                      baseURL={baseURL}
                      /> 
                </div>
                <div>
                <PodcastBox 
                      podcastName={props.array[1].podcastName} 
                      speakerName={props.array[1].speakerName}
                      description={props.array[1].podcastDes}
                      type={props.array[1].type}
                      fileURL={props.array[1].fileURL}
                      baseURL={baseURL}
                      /> 
                </div>
        </Carousel>
    </div>
  )
}
