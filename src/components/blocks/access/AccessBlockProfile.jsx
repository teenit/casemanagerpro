import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Доступ до розділу профілю користувачів' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'контактна інформація' },
          { value: '2', label: 'створені кейси' },
          { value: '3', label: 'доступні кейси' },
          { value: '4', label: 'подані звіти' },
          { value: '5', label: 'подані історії' },
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
                <div className="AccessBlockCase-line-title">Доступ до розділу профілю користувачів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_profile} onChange={handleSelectChange} /></div>
                
            </div>
        </div>
    )
}

export default AccessBlockCase;