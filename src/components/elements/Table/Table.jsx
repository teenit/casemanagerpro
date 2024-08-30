import React from "react";
import Row from "./Row";
import Cell from "./Cell";

const Table = ({ columns = [], data = [], keyField }) => {
    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        {columns.map((item) => (
                            <Cell key={item.dataField} cell={item.text} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <Row key={item[keyField]} columns={columns} data={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
