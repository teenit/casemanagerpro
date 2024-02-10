import axios from "axios";
import { serverAddres } from "../components/Functions/serverAddres";

let fetchObj = {
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
};

export const fetchContscts = () => {
  return axios({
    url: serverAddres("manage/get-contacts.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(fetchObj),
  }).then((response) => response.data);
};

export const fetchCategories = () => {
  return axios({
    url: serverAddres("manage/get-categories-contact.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(fetchObj),
  }).then((response) => {
   if(response.data?.message){
    ///
    console.log(response.data)
    return response.data.mas
   }else{
    return response.data.mas
   }});
};

export const addContact = (contact) => {
  return axios({
    url: serverAddres("manage/add-new-contact.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(contact),
  }).then((response) => response.data);
};

export const deleteContact = (contact) => {
  return axios({
    url: serverAddres("manage/delete-contact.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(contact),
  }).then((response) => response.data);
};

export const editContact = (contact) => {
  return axios({
    url: serverAddres("manage/edit-contact.php"),
    method: "POST",
    header: { "Content-Type": "application/json;charset=utf-8" },
    data: JSON.stringify(contact),
  }).then((response) => response.data);
};
