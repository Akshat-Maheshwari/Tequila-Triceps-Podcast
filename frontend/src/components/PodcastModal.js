import React , { useRef, useEffect }  from "react" ;
import Cookies from "js-cookie";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';


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

export default function PodcastModal(props) {
  const videoRef=useRef(null);
  const handleVideoEnd = () => {Cookies.remove(props.fileURL);};
  const handleVideoPause = () => {Cookies.set(props.fileURL, videoRef.currentTime)};

  useEffect(() => {const playbackTime = Cookies.get(props.fileURL);
  if(playbackTime) {
      videoRef.currentTime = playbackTime;
      console.log(videoRef)
    }
    // console.log(playbackTime);
    // if(playbackTime) {
    //   console.log("j")
    //   videoRef.currentTime.play();
    // }
  }, [props.fileURL, videoRef]);

  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.type==="audio" && 
        <div className='flex justify-center'>
        <img src={props.thumbnailURL}
        alt="thumbnail" style={{height:"40vh", borderRadius: '10px', padding:"20px"}}
        />
        </div>
        }
        <div className='flex justify-center'>
        {props.type==="audio"?(
          <audio width="100%" controls autoPlay>
              <source src={props.fileURL} type="audio/mpeg" />
              Your browser does not support the audio tag.
          </audio>):(
          <div style={{width:"45vw"}}>
          <video autoPlay ref={videoRef} onEnded={handleVideoEnd} onPause={handleVideoPause} width="100%" controls>
              <source src={props.fileURL} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          </div>
        )}
        </div>
        <div className='flex flex-col p-8'>
          <div className='flex justify-between'>
          <div className='flex flex-col'>
          <Typography gutterBottom variant="h5" component="div">
              {props.podcastName}
          </Typography>
          <Typography gutterBottom variant="h8" component="div">
              {props.speakerName}
          </Typography>
          </div>
          <IconButton aria-label="add to favorites">
              <FavoriteIcon />
          </IconButton>
          </div>
        </div>

      </Box>
    </Modal>
  )
}


// import React , { useRef, useEffect }  from "react" ;
// import  Cookies from "js-cookie";

// function VideoPlayer({ src }) {
  
// const videoRef =useRef( null);

  
// useEffect(() => {const playbackTime = Cookies.get("videoPlaybackTime");
    
// if(playbackTime) {
//   videoRef.current.currentTime = playbackTime;
//   }
//   videoRef.current.play();
//   }, []);

// const handleVideoEnd = () => {Cookies.remove("videoPlaybackTime");};

// const handleVideoPause = () => {Cookies.set("videoPlaybackTime", videoRef.current.currentTime)};


// return (    
// <video src={src} ref={videoRef} onEnded={handleVideoEnd} onPause={handleVideoPause}/>
//   );
// }