import { createContext, useState } from "react";

export const FavContext=createContext();

export function FavProvider({children}){
    const [favoritePod,setFavoritePod]=useState({});
return (
    <FavContext.Provider value={[favoritePod,setFavoritePod]}>
        {children}
    </FavContext.Provider>
);
}