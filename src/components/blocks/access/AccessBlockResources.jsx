import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Option 1' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'додати' },
          { value: '2', label: 'видаляти' },
          { value: '3', label: 'завантажити' },
          { value: '4', label: 'редагувати' },
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
                <div className="AccessBlockCase-line-title">Доступ до розділу ресурси</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_resources} onChange={handleSelectChange} /></div>
                
            </div>
        </div>
    )
}

export default AccessBlockCase;