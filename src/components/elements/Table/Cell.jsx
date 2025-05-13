import React from "react";

const Cell = ({ cell, headerFormatter, column, sortField, sortOrder, breakWord }) => {

    return <td>
        {!headerFormatter ? <div title={breakWord ? cell : ""} className={`cell ${breakWord ? "break-word" : ""}`}>{cell}</div> : column.headerFormatter(sortField, sortOrder)}
    </td>;
};

export default Cell;
