import React, { useEffect, useState } from "react";
import AddGroup from "./AddGroup";
import { apiResponse } from "../Functions/get_apiObj";

const Groups = () => {
    const [addGroup, setAddGroup] = useState(false);
    useEffect(()=>{
        apiResponse({},"groups/get-case-groups.php").then((res)=>{
            console.log(res);
        })
    },[])
    return (
        <div className="Groups">
            <p>Groups</p>
            <AddGroup />
        </div>
    )
}

export default Groups;