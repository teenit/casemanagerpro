import React from "react";
import { useState } from "react";
import searchIco from "../../../img/icons/search-black-50.png"
import searchIcoWhite from "../../../img/icons/search-50.png"
import loadImg from "./../../../img/loading_3.gif"
import s from "./search.module.css"
import { search } from "../../Functions/search";
import SearchResult from "./SearchResult";
import { serverAddres } from "../../Functions/serverAddres";

const SearchMenu = ()=>{
    const [active, setActive] = useState(false);
    const [load,setLoad] = useState(false);
    const [results,setResults] = useState(null)
    return(
        <div className={active ? `${s.search__wrap} ${s.active}` : s.search__wrap}>
            <div className={active ? `${s.search__inner} ${s.active}` : s.search__inner}>
                <input className={s.search__inp} type="text" 
                onChange={(val)=>{
                    search(serverAddres("case/search.php"),val.target.value.trim(),setLoad,setResults)
                }}/>
            </div>
            {load && active? 
        <img src={loadImg} alt="" className={s.search__img} />:
            <img className={s.search__img} src={active ? searchIco : searchIcoWhite} alt="" onClick={()=>{
                setActive(!active)
            }} />}
            
            {results && active ? <div className={s.results}>
                <SearchResult elems = {results} close = {()=>{
                setActive(!active)}}/>
            </div>:null}
        </div>
    )
}

export default SearchMenu;