import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PodcastModal from './PodcastModal';
import FavButton from './FavButton';

function SearchResultCard({item,fav}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    function handleClose(){
        setOpen(false);
        console.log(open);
    }
    
    return (
      <>
        <PodcastModal open={open} handleClose={handleClose} fav={fav} item={item}/>
        <Card sx={{display:"flex", boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:3,minWidth: "450px",  minHeight:80, margin:1}}>
            <Button onClick={handleOpen} sx={{width:"100%", justifyContent:"space-between"}}>
                <div className="flex">
                    <CardMedia
                    component="img"
                    sx={{ objectFit:"cover", borderRadius:5, height: 80, width: 80, padding:1 }}
                    alt="thumbnail"
                    image={item.thumbnailURL}
                    />
                    <Stack direction="column" sx={{textAlign:"left",padding:1}}>                
                        <Typography gutterBottom variant="body2" component="div" sx={{marginBottom:0, textAlign:'left'}}>
                            {item.podcastName}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" sx={{color:"grey"}}>
                            {item.speakerName}
                        </Typography>
                    </Stack>  
                </div>
            </Button>
            <CardActions sx={{padding:0, alignItems: "center"}}>
                <FavButton fav={fav} item={item}/>
            </CardActions>
        </Card>
      </>
    );
}

export default SearchResultCard