import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import PodcastModal from './PodcastModal';

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
        image={props.thumbnailURL}
        alt="thumbnail"
      />
      </Button>
      <PodcastModal open={open} handleClose={handleClose} fileURL={props.fileURL} type={props.type} name={props.podcastName} speaker={props.speakerName} thumbnailURL={props.thumbnailURL}/>
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
