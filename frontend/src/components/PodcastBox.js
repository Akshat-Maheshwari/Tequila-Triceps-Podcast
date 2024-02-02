import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PodcastModal from './PodcastModal';
import { limitText } from '../utility/helper';
import FavButton from './FavButton';

export const PodcastBox=({item,fav})=>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Card sx={{boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",padding:1,borderRadius:3,width: 300,  minHeight:400, margin:2}}>
      <Button onClick={handleOpen}>
      <CardMedia
        component="img"
        sx={{ objectFit:"cover", borderRadius:5, height: 250, width: 300, padding:1 }}
        alt="thumbnail"
        image={item.thumbnailURL}
      />
      </Button>
      <PodcastModal open={open} handleClose={handleClose} fav={fav} item={item}/>
      <CardContent sx={{padding:1}}>
        <Stack direction="row" sx={{textAlign:"left", justifyContent:"space-between"}}>
          <Stack>
          <Typography gutterBottom variant="h6" component="div" sx={{marginBottom:0, textAlign:'center'}}>
            {item.podcastName}
          </Typography>
          <Typography gutterBottom variant="h8" component="div">
            {item.speakerName}
          </Typography>
          </Stack>
          <CardActions sx={{padding:0, alignItems: "flex-start"}}>
            <FavButton fav={fav} item={item}/>
          </CardActions>
        </Stack>
        <Typography sx={{height:30, textAlign:"justify"}} variant="body2" color="text.secondary">
          {limitText(item.podcastDes,110)}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};
export default PodcastBox;
