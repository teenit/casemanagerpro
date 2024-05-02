import React, { useState } from "react";
import { appConfig } from "../../../services/config";

const AccessDefaultBlock = (props) => {
    const [state, setState] = useState({
        type: props.type,
        accesses: props.accesses
    })
   const access = appConfig.newAccess[state.type]

    return (
        <div className="AccessDefaultBlock">
            <div className="AccessDefaultBlock-container">
                <div className="line">
                    <div className="title">Назва</div>
                    <div className="show">Відображати</div>
                    <div className="edit">Редагувати</div>
                </div>
                {
                    Object.values(access).map((item)=>{
                        console.log(item)
                        
                    })
                }

            </div>
            <button onClick={()=>console.log(access, state)}>000000</button>
        </div>
    )
}
export default AccessDefaultBlock;