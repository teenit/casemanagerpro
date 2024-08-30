import React from "react";
import Cell from "./Cell";

const Row = ({ columns = [], data = {} }) => {
    const getCell = (column) => {
        if (column.formatter) {
            return column.formatter(data[column.dataField], data);
        }
        return data[column.dataField];
    };

    return (
        <tr>
            {columns.map((item) => (
                <Cell key={item.dataField} cell={getCell(item)} />
            ))}
        </tr>
    );
};

export default Row;
