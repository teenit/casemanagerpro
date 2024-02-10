import axios from "axios";
import { serverAddres } from "../components/Functions/serverAddres";

let fetchObj = {
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
};

export const fetchCases = () => {
  return axios({
    url: serverAddres("get-cases.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(fetchObj),
  }).then((response) => response.data);
};

let obj = {
  userId: window.location.search.slice(1),
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
};
export const doneBells = (idBell)=>{
  axios({
    url: serverAddres("user/done-notification.php"),
    method: "POST",
    header: { 'Content-Type': 'application/json;charset=utf-8' },
    data: JSON.stringify({...obj,idBell:idBell}),
  })
    .then((data) => {
        console.log(data)
        return data.data;
    })
    .catch((error) => console.log(error))
}
export const fetchUser = () => {
  return axios({
    url: serverAddres("user/get-user.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => {
    console.log(response.data)
    console.log(obj)
    if(response.data?.message){
      if(response.data.fail == "001"){
        return response.data;
      }else if(response.data.fail == "002"){
        return false;
      }
    }else{
      if(obj.userId == obj.id){
        console.log(response)
        response.data.changePass = true;
      }
      return response.data
    }
    
  });
};

export const addReport = (obj) => {
  return axios({
    url: serverAddres(""),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const addHistory = (obj) => {
  return axios({
    url: serverAddres(""),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const fetchReport = () => {
  return axios({
    url: serverAddres(""),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const fetchHistory = () => {
  return axios({
    url: serverAddres(""),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const authorizate = () => {
  return axios({
    url: serverAddres(""),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const getNotifications = () => {
  return axios({
    url: serverAddres("/user/get-notification.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(obj),
  }).then((response) => response.data);
};

export const getUsers = ()=>{
  axios({
    url: serverAddres("user/get-users.php") ,
    method: "POST",
    header : {'Content-Type': 'application/json;charset=utf-8'},
    data : JSON.stringify(obj),
  })
  .then((data)=>{ 
      console.log(data.data)
        return data.data;
  })
  .catch((error)=>console.log(error)) 
}

