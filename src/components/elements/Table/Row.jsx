import React from "react";
import Cell from "./Cell";

const Row = ({rowStyle=null, columns = [], data = {} }) => {
    const getCell = (column) => {
        if (column.formatter) {
            return column.formatter(data[column.dataField], data);
        }
        return data[column.dataField];
    };
const getStyle = ()=>{
    if(rowStyle.condition && rowStyle.condition(data)){
        return rowStyle.class
    }
    return ''
}
    return (
        <tr className={`${getStyle()}`}>
            {columns.map((item) => (
                <Cell key={item.dataField} cell={getCell(item)} breakWord={item?.breakWord}/>
            ))}
        </tr>
    );
};

export default Row;
