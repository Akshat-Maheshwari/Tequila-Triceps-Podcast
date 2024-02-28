import React , { useRef, useEffect }  from "react" ;
import Cookies from "js-cookie";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavButton from './FavButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '70vh',
  minWidth: '20vw',
  borderRadius: '10px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function PodcastModal({fav,open,handleClose,item}) {
  console.log(item);
  const videoRef=useRef(null);
  const handleVideoEnd = () => {Cookies.remove(item.fileURL);};
  const handleVideoPause = () => {console.log(videoRef);Cookies.set(item.fileURL, videoRef.currentTime)};

  useEffect(() => {
    const playbackTime = Cookies.get(item.fileURL);
    if(playbackTime) {
        videoRef.currentTime = playbackTime;
    }
  }, [item.fileURL, videoRef]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        {
        item.type==="audio" && 
        <div className='flex justify-center'>
          <img src={item.thumbnailURL} alt="thumbnail" style={{height:"40vh", borderRadius: '10px', padding:"20px"}} />
        </div>
        }
        <div className='flex justify-center'>
        {item.type==="audio"?(
          <audio width="100%" controls autoPlay>
              <source src={item.fileURL} type="audio/mpeg" />
              Your browser does not support the audio tag.
          </audio>):(
          <div style={{width:"45vw"}}>
          <video autoPlay ref={videoRef} onEnded={handleVideoEnd} onPause={handleVideoPause} width="100%" controls>
              <source src={item.fileURL} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          </div>
        )}
        </div>
        <div className='flex flex-col p-8'>
          <div className='flex justify-between'>
          <div className='flex flex-col'>
            <Typography gutterBottom variant="h5" component="div">
                {item.podcastName}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
                {item.speakerName}
            </Typography>
            <Typography className="hidden" gutterBottom variant="h8" component="div">
              {item.podcastDes}
            </Typography>
          </div>
          <FavButton fav={fav} item={item}/>
          </div>
        </div>
      </Box>
    </Modal>
  )
}