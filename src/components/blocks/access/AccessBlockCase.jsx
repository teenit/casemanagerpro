import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";

const AccessBlockCase = ({accesses}) => {

    const [selectedOption, setSelectedOption] = useState({ value: 'option1', label: 'Option 1' });

    const options = [
        [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ]
    ];
  
    const handleSelectChange = (value) => {
      setSelectedOption(value);
      // Делаем что-то с выбранным значением
    };

    return (
        <div className="AccessBlockCase">
            <div className="AccessBlockCase-line">
                <div className="AccessBlockCase-line-title">Перегляд кейсу</div>
                <div className="AccessBlockCase-line-right"><SelectElem options={options} defaultValue={selectedOption} onChange={handleSelectChange} /></div>
                
            </div>
        </div>
    )
}

export default AccessBlockCase;