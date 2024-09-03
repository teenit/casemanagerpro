import React from "react";

const Cell = ({ cell, headerFormatter, column, sortField, sortOrder }) => {

    


    return <td>
        {!headerFormatter ? <div className="cell">{cell}</div> : column.headerFormatter(sortField, sortOrder)}
    </td>;
};

export default Cell;
