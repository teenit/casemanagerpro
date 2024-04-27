import React, { useEffect, useState } from "react";

const ListCategories = ({categories}) => {
    const [state, setState] = useState({
        list:categories
    })
    return (
        <div className="ListCategories">
            {
                categories.map((item, ind)=>{
                    return(
                    <div className="ListCategories--item" key={item.id} title={item.description}>
                        <div className="ListCategories--item-number">{ind + 1}.</div>
                        <div className="ListCategories--item-circle" style={{backgroundColor:item.color}}></div>
                        
                        <div className="ListCategories--item-title">{item.name}</div>
                    </div>)
                })
            }
        </div>
    )
}

export default ListCategories