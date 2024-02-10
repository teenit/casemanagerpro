import React from "react";
import s from "./search.module.css"
const SearchResult =({elems,close})=>{
    return(
        <div className={s.items}>
           {elems.map((elem,ind)=>{
            return (
                <div className={s.item} key={ind}>
                <div className={s.item__name}>
                    <a onClick={()=>{close()}} href={`/case?${elem.id}`}>{elem.surname} {elem.firstName} {elem.secondName}</a>
                </div>
                <div className={s.item__phone}>
                    <a onClick={()=>{close()}} href={`tel:${elem.phone1}`}>{elem.phone1}</a>
                </div>
            </div>
            )
           })}
        </div>
    )
}

export default SearchResult;