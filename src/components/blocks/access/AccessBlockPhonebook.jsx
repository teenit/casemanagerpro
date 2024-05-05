import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Доступ до розділу телефонна книга' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'створення контакту' },
          { value: '2', label: 'редагування контакту' },
          { value: '3', label: 'видалення контакту' },
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
                <div className="AccessBlockCase-line-title">Доступ до розділу телефонна книга</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_phonebook} onChange={handleSelectChange} /></div>
                
            </div>
        </div>
    )
}

export default AccessBlockCase;