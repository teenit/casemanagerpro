import React from "react";
import Row from "./Row";
import Cell from "./Cell";

const Table = ({ columns = [], data = [], keyField, addClass = "", sortField = "", sortOrder = "", emptyTable = null }) => {
    return (
        <div className={`Table ${addClass}`}>
            <table>
                <thead>
                    <tr>
                        {columns.map((item) => (
                            <Cell sortField={sortField} sortOrder={sortOrder} key={item.dataField} column={item} cell={item.text} headerFormatter={typeof item.headerFormatter == 'function' ? true : false} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <Row key={item[keyField]} columns={columns} data={item} headerFormatter={false} />
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
