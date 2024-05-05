import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { useAuth } from "../../hooks/use-auth";
import React from "react";
import { serverAddres } from "../Functions/serverAddres";
export const Check = ()=>{
    const dispatch = useDispatch();
    const {isAuth, email, data, token, id} = useAuth();
    async function getUser(data){
        await fetch(serverAddres("check-auth.php"),{
            method:"POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            body:  JSON.stringify({isAuth, email, data, token, id})
        })
            .then(res => res.json())
            .then((data) => {
                
               dispatch(setUser({
                    email:data.email,
                    id: data.id,
                    token: data.token,
                    data:data
                }))
            })
            .catch(rejected => {
                console.log(rejected);
            });   
    }
   return getUser()
}