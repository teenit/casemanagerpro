import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Дивитися івент' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначеної категорії' },
          { value: '3', label: 'тільки призначені' },
          { value: '4', label: 'Є доступ до івенту, якщо додано як організатора' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'редагувати' },
          { value: '2', label: 'видаляти' },
          { value: '3', label: 'переміщати в архів' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'додавати учасника кейсу' },
          { value: '2', label: 'видаляти учасника кейсу' },
          { value: '3', label: 'додавати організатора' },
          { value: '4', label: 'видаляти організатора' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'відгук до плану' },
          { value: '3', label: 'редагувати план' },
          { value: '4', label: 'редагувати відгук до плану' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'завантажувати' },
          { value: '2', label: 'видаляти' },
          { value: '3', label: 'завантажувати медіа-файли' },
          { value: '4', label: 'видаляти медіа-файли' },
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
                <div className="AccessBlockCase-line-title">Дивитися івент</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_event_watch} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Редагувати івент</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_event_edit} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Учасники івенту</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_event_members} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">План івенту</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[3]} defaultValue={accesses.a_page_event_plan} onChange={handleSelectChange} /></div> 
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Документи до івенту</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[4]} defaultValue={accesses.a_page_event_documents} onChange={handleSelectChange} /></div> 
            </div>
        </div>
    )
}

export default AccessBlockCase;