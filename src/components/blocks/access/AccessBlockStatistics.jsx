import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Категорії кейсів' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '2', label: 'призначеної категорії' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначеної категорії' },
          { value: '3', label: 'тільки призначені' },
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
                <div className="AccessBlockCase-line-title">Категорії кейсів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_statistics_cases} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Відображати статистику по днях народження кейсів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_statistics_cases_hb} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Доступне місце на сервері</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_statistics_server_data} onChange={handleSelectChange} /></div>
            </div>
        </div>
    )
}

export default AccessBlockCase;