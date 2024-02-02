import Typography from '@mui/material/Typography';

export default function TextPodcastContainer({right,title}){
    return <>
    {right?
      <div className='flex'>
        <div className='text-center flex align-middle pl-8'>
          <Typography variant="h4" component="div" gutterBottom  style={{transform:"rotate(180deg)", writingMode: "vertical-rl", whiteSpace: "nowrap"}}>{title}</Typography>
        </div>
      </div>:
      <div className='flex'>
        <div className='text-center flex align-middle pr-8'>
          <Typography variant="h4" component="div" gutterBottom  style={{transform: "rotate(360deg)", writingMode: "vertical-rl", whiteSpace: "nowrap"}}>{title}</Typography>
        </div>
        </div>
    }
    </>
  }