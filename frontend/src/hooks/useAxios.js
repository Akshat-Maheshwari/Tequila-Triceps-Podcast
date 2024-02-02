import axios from "axios";
import {useState} from 'react';

export default function useAxios(method,...params){
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [data,setData]=useState(null);
    const fire=()=>{
        setLoading(true);
        setError(null);
        axios[method](...params).then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
    }
  
    return [loading, error, data, fire];
  }