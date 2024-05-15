import React, {useEffect, useState} from "react";
import imgDelete from "./../../img/icons/delete-48.png";
import axios from "axios";
import { serverAddres } from "../Functions/serverAddres";
import LoadingPage from "../Loading/LoadingPage";
import { translateString } from "../Functions/translateString";
import Icon from "../elements/Icons/Icon";

let categoriesStr = "";
const SetContactCategory = ({cats})=>{
    const [categoriesContact, setCategoriesContact] = useState(false)
    const [page, setPage] = useState({loading:true,effload:false,message:""})
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("manage/get-categories-contact.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data?.message){
              setPage({loading:true,effload:false,message:data.data.message})
              setCategoriesContact(data.data.mas);  
            }else{
                setCategoriesContact(data.data.mas);
                setPage({loading:false,effload:true})
            }
            cats(data.data.mas);
        })
        .catch((error)=>console.log(error)) 
    },[])
    function deleteCategory(arg){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            category: arg
        }
        axios({
            url: serverAddres("manage/delete-categories-contact.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setCategoriesContact(data.data);
        })
        .catch((error)=>console.log(error)) 
    }
    function addNewCategory(id){
        if(document.querySelector("#" + id).value == "") return alert("Заповніть поле");
        let category = {
            value: translateString(document.querySelector("#" + id).value),
            text:document.querySelector("#" + id).value.replace("'", "’"),
            color:document.querySelector("#colorBackground__contact").value
        }
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            category:category
        }
        axios({
            url: serverAddres("manage/add-categories-contact.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            document.querySelector("#" + id).value = ""
            setCategoriesContact(data.data);     
        })
        .catch((error)=>console.log(error)) 
    }
    const CategoriesData = ({category, index})=>{
        return (
        <div className={`set__categories__case__list__category ${index % 2 == 0 ?  "arc":""}`}>
            <div className="set__categories__case__list__category__title">
                <div className="category__circle" style={{backgroundColor: category.color}}></div>
                <span>{category.text}</span>
            </div>
            <div className="set__categories__case__control">
                <span onClick={()=>{
                    if(page.effload) deleteCategory(category);
                }}>
                    <Icon icon={"delete"} addClass={"close-icon"}/>
                </span>
            </div>
        </div>
        )
    }
    const CategoriesMas = (pos)=>{
        if(pos.length < 1 || pos == false) return;
                categoriesStr =  pos.map((post,index)=>{
                return <CategoriesData key={index} category={post} index={index}/>
        })  
    }    

    return(
        <div className="wrap__set__categories__case">
            <div className="inner__set__categories__case">
                <div className="set__categories__case__title">
                    <h2>
                        Категорії контактів для телефонної книги
                    </h2>
                   
                </div>
                {!page.loading ? <div className="set__categories__case__control">
                    <div className="set__categories__case__control__inp">
                        <input title="Нова категорія" type="text" id="set__categories__contact__control__inp" placeholder={"Назва категорії"}/>
                        <input title="Колір категорії" type="color" name="colorBackground__contact" id="colorBackground__contact" defaultValue={"#ffa800"}/>
                    </div>
                    <div className="set__categories__contact__control__btn">
                        <button className="primary__btn padding20px"
                        onClick={()=>{addNewCategory("set__categories__contact__control__inp")}}>Додати нову категорію</button>
                    </div>
                </div>:<div className="block__loading">
                            <LoadingPage message={page.message} effload = {page.effload}/>
                        </div>}
                <div className="set__categories__case__list">
                        {CategoriesMas(categoriesContact)}
                        {categoriesStr}
                </div>
            </div>
        </div>
    )
}
export default SetContactCategory;