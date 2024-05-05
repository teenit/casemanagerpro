import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Керування категоріями кейсів' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'створити' },
          { value: '2', label: 'редагувати' },
          { value: '3', label: 'видалити' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'створити' },
          { value: '2', label: 'редагувати' },
          { value: '3', label: 'видалити' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'активація / деактивація' },
          { value: '2', label: 'налаштування прав для користувача' },
          { value: '3', label: 'видалити користувача' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
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
                <div className="AccessBlockCase-line-title">Керування категоріями кейсів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_manage_cases_category} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Керування категоріями контактів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_manage_contacts_category} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Керування користувачем</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_manage_user} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Оновлення програми Case Manager</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[3]} defaultValue={accesses.a_page_manage_update} onChange={handleSelectChange} /></div>
            </div>
        </div>
    )
}

export default AccessBlockCase;