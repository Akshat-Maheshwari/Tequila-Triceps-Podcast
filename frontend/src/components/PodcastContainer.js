import React from 'react'
import PodcastBox from './PodcastBox';
import TextPodcastContainer from './TextPodcastContainer';
import useFav from '../hooks/useFav'

export default function PodcastContainer(props) {
  const [favoritePod,setFavoritePod]=useFav();
  return (
    <>
      <div className='flex justify-between'>
        {props.right && <TextPodcastContainer right={props.right} title={props.title}/>}
        <div className={`w-11/12 p-2 bg-gray-200 rounded-3xl mt-1 ${props.right?"rounded-e-none mr-0":"rounded-s-none ml-0"}`}>
            <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                {props.array.map((item)=>       
                    <div key={item._id}>
                      <PodcastBox item={item} fav={favoritePod[item._id]?true:false} />
                    </div>
                )}
            </div>
        </div>
        {!props.right && <TextPodcastContainer right={props.right} title={props.title}/>}
      </div>
    </>
  )
}
