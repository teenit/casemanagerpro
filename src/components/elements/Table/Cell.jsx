import React from "react";

const Cell = ({ cell, headerFormatter, column }) => {

    


    return <td>
        {!headerFormatter ? <div className="cell">{cell}</div> : column.headerFormatter()}
    </td>;
};

export default Cell;
