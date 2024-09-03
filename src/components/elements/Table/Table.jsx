import React from "react";
import Row from "./Row";
import Cell from "./Cell";

const Table = ({ columns = [], data = [], keyField, addClass="" }) => {
    return (
        <div className={`Table ${addClass}`}>
            <table>
                <thead>
                    <tr>
                        {columns.map((item) => (
                            <Cell key={item.dataField} column = {item} cell={item.text} headerFormatter={typeof item.headerFormatter == 'function' ? true : false}/>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <Row key={item[keyField]} columns={columns} data={item} headerFormatter={false}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
