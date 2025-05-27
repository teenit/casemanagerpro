import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";
import { LANG } from "../../../services/config";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Перегляд шаблонів' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки дозволені' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'додавати' },
          { value: '2', label: 'редагувати' },
          { value: '3', label: 'видаляти' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки дозволені' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'додавати' },
          { value: '2', label: 'редагувати' },
          { value: '3', label: 'видаляти' },
          { value: '8', label: 'повний доступ' },
        ],
      ];
      
  
    const handleSelectChange = (value) => {
      setSelectedOption(value);
      // Делаем что-то с выбранным значением
    };

    return (
        <div className="AccessBlockCase">
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">{LANG.ACCESS.access.look}</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={selectedOption[0]} defaultValue={accesses.a_page_access_watch_roles} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">{LANG.ACCESS.access.edit}</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={selectedOption[1]} defaultValue={accesses.a_page_access_edit_roles} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">{LANG.ACCESS.access.look_rights}</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={selectedOption[2]} defaultValue={accesses.a_page_access_watch_permissions} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">{LANG.ACCESS.access.edit_rights}</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={selectedOption[3]} defaultValue={accesses.a_page_access_edit_permissions} onChange={handleSelectChange} /></div> 
            </div>
        </div>
    )
}

export default AccessBlockCase;