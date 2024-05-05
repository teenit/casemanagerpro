import React from "react";
import { NavLink } from "react-router-dom";
const Active = ({elem})=>{
    return(
        <div className="journal__line">
            <NavLink to={`/user?${elem.userId}`} className="journal__a">{"elem.user.name"}</NavLink>
            <div className="journal__date">
                <p>{elem.date}</p>
            </div>
            <div className="journal__message">
                <p>{elem.message}</p>
            </div>
        </div>
    )
}

const JournalActive = ({info})=>{

    const active = info.map((elem,index)=>{
        return <Active key={index} elem={elem}/>
}) 
    return(
        <div className="wrap__block">
            <h2>Журнал активностей</h2>
            <div className="activity">
                {active}
            </div>
        </div>
        
    )
}
export default JournalActive;