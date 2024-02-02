import { useContext } from "react";
import { FavContext } from "../contexts/FavContext";

export default function useAuth(){
    return useContext(FavContext);
}