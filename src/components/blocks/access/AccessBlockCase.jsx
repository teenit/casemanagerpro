import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";
import { useLocation } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";

const AccessBlockCase = ({ accesses }) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Створити кейс' });
    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначених категорій' },
          { value: '3', label: 'тільки призначені' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначених категорій' },
          { value: '3', label: 'тільки призначені' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначених категорій' },
          { value: '3', label: 'тільки призначені' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'додавати' },
          { value: '2', label: 'створювати зв\'язки між кейсами' },
          { value: '3', label: 'створювати індивідуальний план' },
          { value: '4', label: 'видалити кейс' },
          { value: '5', label: 'додавати файли' },
          { value: '6', label: 'експортувати' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'призначених категорій' },
          { value: '2', label: 'тільки свої' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначених категорій' },
          { value: '3', label: 'тільки призначені' },
          { value: '4', label: 'додавати запис про надану допомогу' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'приховано повністю' },
          { value: '1', label: 'майже все приховано' },
          { value: '2', label: 'середньо' },
          { value: '3', label: 'низько' },
          { value: '8', label: 'повний доступ' },
        ],
      ];
      

    const handleSelectChange = (value) => {
        setSelectedOption(value);
       console.log(value);
    };
    const LOCATION = useLocation()
    useEffect(()=>{
      apiResponse({access_id:LOCATION.pathname.slice(LOCATION.pathname.length - 1)},"access/get-case.php").then((data)=>{
        console.log(data)
      })
    },[])
    return (
      
        <div className="AccessBlockCase">

                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Створити кейс</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_case_add} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Переглядати кейс</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_case_look} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Доступ до редагуванння кейсів</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_case_edit_permission} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Редагувати кейс</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[3]} defaultValue={accesses.a_page_case_edit_actions} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Передати кейс іншому користувачу</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[4]} defaultValue={accesses.a_page_case_transfer} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Додавати нотатки до кейсу</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[5]} defaultValue={accesses.a_page_case_add_notes} onChange={handleSelectChange} /></div>
                    </div>
                    <div className="AccessBlockCase-line">
                        <div className="AccessBlockCase-line-title">Приховати інформацію</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={options[6]} defaultValue={accesses.a_page_case_hidden} onChange={handleSelectChange} /></div>
                    </div>
                


        </div>
    )
}

export default AccessBlockCase;