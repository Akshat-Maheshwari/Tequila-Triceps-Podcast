import {useState,useEffect} from 'react';

export default function useDebounce(value,delay=500){
    const [debouncedVal,setDebouncedVal] = useState(value);
    useEffect(()=>{
        let timer=setTimeout(()=>{
            setDebouncedVal(value);
        },delay)
        return ()=>clearTimeout(timer);
    },[value])
    return debouncedVal;
}