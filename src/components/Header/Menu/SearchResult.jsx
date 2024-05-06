import React from "react";
import s from "./search.module.css"
import { NavLink } from "react-router-dom";
const SearchResult =({elems,close})=>{
    return(
        <div className={s.items}>
           {elems.mas.map((elem,ind)=>{
            return (
                <div className={s.item} key={ind}>
                <div className={s.item__name}>
                    <NavLink onClick={close} to={`/case/${elem.id}`}>{elem.id} {elem.name}</NavLink>
                </div>
                {/* <div className={s.item__phone}>
                    <a onClick={()=>{close()}} href={`tel:${elem.phone1}`}>{elem.phone1}</a>
                </div> */}
            </div>
            )
           })}
        </div>
    )
}

export default SearchResult;