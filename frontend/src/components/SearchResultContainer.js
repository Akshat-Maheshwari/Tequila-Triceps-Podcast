import React, { useEffect} from 'react'
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import SearchResultCard from './SearchResultCard';
import useFav from '../hooks/useFav';
import useDebounce from '../hooks/useDebounce';

export default function SearchResultContainer({query}) {
    const {baseURL}=useAuth();
    const [favoritePod,setFavoritePod]=useFav();
    const debouncedSearch=useDebounce(query);
    const postParams=[baseURL+"/search",{query:query},{headers:{'Content-Type': 'application/json'}}];
    const [loading,error,data,fire]=useAxios("post",...postParams);
    
    useEffect(()=>{
        if(debouncedSearch!="") fire();
    },[debouncedSearch])
  return (
    <>
        <div className="overflow-scroll scrollbar-hide flex flex-col items-center z-10 shadow-lg rounded-lg top-16 absolute my-1 w-1/3 bg-gray-300 max-h-96">
            {loading && <div className='p-2 text-slate-500'>Loading ...</div>}
            {error && <div className='p-2 text-slate-500'>Something went wrong</div>}
            {(!loading && !error && data && debouncedSearch!="") && 
                data.map((item)=>{
                    return <SearchResultCard item={item} fav={favoritePod[item._id]?true:false} />
                })
            }
        </div>
    </>
  )
}
