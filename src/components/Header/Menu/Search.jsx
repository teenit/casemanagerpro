import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import searchImg from "./../../../img/search.png";
import loadImg from "./../../../img/loading_2.gif";
import { serverAddres } from "../../Functions/serverAddres";

const LoadSearch = ({active})=>{

    return active ? (
        <div className="search__elem">
            <img src={loadImg} alt="" />
        </div>
    ):(
       <></>
    )
}

const SearchRes = ({elem})=>{
    return elem.surname.length > 1 ?(
         <div className="search__viewer__line">
         <div className="search__viewer__data">
            <a href={`/case?${elem.id}`} >{elem.surname} {elem.firstName} {elem.secondName}</a>  
         </div>
         <div className="search__viewer__phons">
            <span>{elem.phone1}</span>  
            <span>{elem.phone2}</span>  
         </div>
     </div>
    ):(
        <></>
    )
}
const Search = ()=>{
    const [loadSearch, setLoadSearch] = useState(false)
    const [search, setSearch] = useState([]);

    function addNote(val){
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            val:val
        }
        setLoadSearch(true)
        axios({
            url: serverAddres("case/search.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
            onUploadProgress: event => {
                setLoadSearch(true)
            },
        })
        .then((data)=>{ 
            setLoadSearch(false)
            setSearch(data.data)  
        })
        .catch((error)=>console.log(error))  
    }

    const searches = search.map((elem,index)=>{
        return <SearchRes key={index} elem={elem}/>
    }) 

    return(
        
        <div className="menu__search">
                <div className="menu__search__input">
                    <div className="menu__search__input__inner">
                        <img src={searchImg} alt="" />
                        <input type="text" name="" id="" onChange={(val)=>{
                            addNote(val.target.value.trim())
                        }} placeholder="Пошук..." />
                        <LoadSearch active = {loadSearch}/>
                    </div>
                    <div className="search__result">
                            {searches}
                    </div>
                </div>
            </div>
    )
}
export default Search;