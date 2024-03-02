import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";

const ListCategories = ({categoryKey = ""}) => {
    const [state, setState] = useState({
        list:[]
    })
    useEffect(()=>{
        apiResponse({categoryKey:categoryKey},"manage/get-categories.php").then((data)=>{
            setState({...state, list:[...data.data]})
        })
    },[categoryKey])
    return (
        <div className="ListCategories">
            {
                state.list.map((item, ind)=>{
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