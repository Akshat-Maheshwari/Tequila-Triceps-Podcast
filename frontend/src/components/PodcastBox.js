import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export const PodcastBox = function MusicCard(props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: 245 }}>
      <Button onClick={handleOpen} sx={{padding: 0}}>
      <CardMedia
        component="img"
        sx={{ height: 250, width: 250 }}
        image="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/travis-scott-album-cover-2016_omwibv/travis-scott-album-cover-2016?fimg-ssr-default"
        alt="thumbnail"
      />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.type==="audio"?(
          <audio controls>
              <source src={props.baseURL+"/"+props.fileURL} type="audio/mpeg" />
              Your browser does not support the audio tag.
          </audio>):(
              <video controls>
                  <source src={props.baseURL+"/"+props.fileURL} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
          )}
        </Box>
      </Modal>

      <CardContent>
        <Stack direction="row" sx={{justifyContent:"space-between"}}>
          <Stack>
          <Typography gutterBottom variant="h5" component="div" sx={{marginBottom:0}}>
            {props.podcastName}
          </Typography>
          <Typography gutterBottom variant="h8" component="div">
            {props.speakerName}
          </Typography>
          </Stack>
          <CardActions sx={{padding:0, alignItems: "flex-start"}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Stack>
        <Typography sx={{height:30}} variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
    
  );
};
export default PodcastBox;
