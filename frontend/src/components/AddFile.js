import React, {useRef, useState} from 'react'
import TextField from '@mui/material/TextField';   
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';

export default function AddFile() {

    const podcastName=useRef();
    const podcastDes=useRef();
    const speakerName=useRef();

    const [podName,setPodName]=useState('');
    const [podDes,setPodDes]=useState('');
    const [speaker,setSpeaker]=useState('');
    const [type,setType]=useState('');
    const [file,setFile]=useState('');

    const handleSubmit=()=>{
        const formData = new FormData();
        formData.append('podcastName',podName);
        formData.append('podcastDes',podDes);
        formData.append('speakerName',speaker);
        formData.append('type',type);
        formData.append('file',file);
        console.log(formData);
    }

  return (
    <div className='form-div'>
        <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
            <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
                <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10'>
                    <Box
                    component="form"
                    sx={{}}
                    noValidate
                    autoComplete="off"
                    >
                        
                        <FormControl component="fieldset" >
                        <div className='flex flex-col gap-5'>
                            <div className="text-lg font-bold text-center">Add Podcast</div>
                            <TextField ref={podcastName} onChange={e => {setPodName(e.target.value)}} required id="standard-basic" label="Podcast Name" variant="outlined" />
                            <TextField ref={podcastDes} onChange={e => {setPodDes(e.target.value)}} required id="standard-basic" label="Podcast Description" variant="outlined" />
                            <TextField ref={speakerName} onChange={e => {setSpeaker(e.target.value)}} required id="standard-basic" label="Speaker Name" variant="outlined" />
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                name="Type of the podcast"
                                onChange={e => {setType(e.target.value)}}
                            >
                                <FormControlLabel value="audio" control={<Radio />} label="Audio" />
                                <FormControlLabel value="video" control={<Radio />} label="Video" />
                            </RadioGroup>
                            <Input
                            accept="*"
                            id="raised-button-file"
                            hidden
                            type="file"
                            onChange={e => {setFile(e.target.files[0])}}
                            />
                            <Button variant="contained" onClick={()=>{handleSubmit()}}>Submit</Button>
                        </div>
                        </FormControl>
                        
                    </Box>
                </div>
                
            </div>
        </div>
    </div>
  )
}


