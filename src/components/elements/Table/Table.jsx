import React from "react";
import Row from "./Row";
import Cell from "./Cell";

const Table = ({rowStyle={}, columns = [], data = [], keyField, addClass = "", sortField = "", sortOrder = "", emptyTable = null }) => {
    return (
        <div className={`Table ${addClass}`}>
            <table>
                <thead>
                    <tr>
                        {columns.map((item, index) => (
                            <Cell sortField={sortField} sortOrder={sortOrder} key={index} column={item} cell={item.text} headerFormatter={typeof item.headerFormatter == 'function' ? true : false} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) => (
                        <Row rowStyle={rowStyle} key={index} columns={columns} data={item} headerFormatter={false} />
                    ))}
                    {data.length === 0 && emptyTable && (
                        <tr>
                            <td colSpan={columns.length} className="Table-emptyTable">{emptyTable}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
