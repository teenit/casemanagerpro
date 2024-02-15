import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Відобразити кейси' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначеної категорії' },
          { value: '3', label: 'тільки призначені' },
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
                <div className="AccessBlockCase-line-title">Відобразити кейси, як список</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_cases_list} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Друк кейсів або збереження як ПДФ</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_cases_export_pdf} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Приховати контактну інформацію кейсів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_cases_contacts_info} onChange={handleSelectChange} /></div>
            </div>
        </div>
    )
}

export default AccessBlockCase;