import React from "react";
import Row from "./Row";
import Cell from "./Cell";

const Table = ({columns = [], data=[], keyField}) => {

    return (
        <div className="Table">
            <table>
                <th>
                    {columns.map((item)=><Cell cell = {item.title}/>)}
                </th>
                {
                    data.map((item)=><Row key={keyField} columns = {columns} data={item}/>)
                }
            </table>
        </div>
    )
}
export default Table;