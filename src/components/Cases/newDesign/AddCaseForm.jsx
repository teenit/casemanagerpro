import React, { useState } from "react";
import Input from "../../elements/Inputs/Input";
import { changeAps } from "../../Functions/translateString";

const AddCaseForm = () => {
    const [state, setState] = useState({
        general: true
    })

    const [stateGeneral, setStateGeneral] = useState({
        first_name:"",
        middle_name:"",
        last_name:"",
        phone1:"",
        phone2:"",
        email:"",
        happy_bd:"",
    })
    const [stateData, setStateData] = useState({
        case_id:0,
        address_registered:"",
        address_live:"",
        categories:[],
        channel:"",
        date_first_contact:"",
        contract_date:"",
        contract_number:"",
        comment:"",
        potreba:"",
        family_info:"",
        history:""
    })

    function changeHandlerGeneral(key,val){
        setStateGeneral({...stateGeneral, [key]:val})
    }

    return(
        <div className="AddCaseForm">
            <div className="AddCaseForm-line three">
                <div>
                    <Input 
                        value={stateGeneral.first_name}
                        label="weifiweh"
                        onChange = {(e)=>{
                            changeHandlerGeneral("first_name", changeAps(e.target.value))
                        }}
                    />
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default AddCaseForm;