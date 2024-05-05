import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/SelectAccess";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Бачити події' });

    const options = [
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'події тільки для користувача' },
          { value: '2', label: 'події для усіх користувачів' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '2', label: 'призначеної категорії' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки кейсів' },
          { value: '2', label: 'тільки користувачів' },
          { value: '3', label: 'із телефонної книги' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'тільки свої' },
          { value: '8', label: 'повний доступ' },
        ],
        [
          { value: '0', label: 'заборонено' },
          { value: '1', label: 'редагувати' },
          { value: '2', label: 'видаляти' },
          { value: '3', label: 'створювати' },
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
                <div className="AccessBlockCase-line-title">Бачити події</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[0]} defaultValue={accesses.a_page_calendar_see_events} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Створити подію у календарі</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[1]} defaultValue={accesses.a_page_calendar_add} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Бачити дні народження користувачів</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[2]} defaultValue={accesses.a_page_calendar_see_hb} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Записи в календар</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[3]} defaultValue={accesses.a_page_calendar_notes} onChange={handleSelectChange} /></div>
            </div>
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Редагувати записи</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options[4]} defaultValue={accesses.a_page_calendar_notes_edit} onChange={handleSelectChange} /></div>
            </div>
        </div>
    )
}

export default AccessBlockCase;