import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AutherizeUser = ({Children})=>{
    const token = localStorage.getItem('token')

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return Children;
}

export const ProtectRoute = ({Children})=>{
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return Children;
}