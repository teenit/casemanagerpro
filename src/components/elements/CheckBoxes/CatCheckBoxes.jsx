import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';

const CatCheckBoxes = ({ data }) => {
    const [state, setState] = useState([...data]);

    const handleCheckBoxChange = (index) => {
        setState((prevData) => {
            const newData = [...prevData];
            newData[index].selected = !newData[index].selected;
            return newData;
        });
    };

    return (
        <div className='CatCheckBoxes'>
                {data.map((item, index) => (
                    <div className='CatCheckBoxes-option' key={index}>
                        <label>
                            <Checkbox
                                value={item.selected}
                                onChange={() => handleCheckBoxChange(index)}
                            />
                            {item.text}
                        </label>


                    </div>
                ))}
        </div>
    );
};

export default CatCheckBoxes;
