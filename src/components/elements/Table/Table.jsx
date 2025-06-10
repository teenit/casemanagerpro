import React from "react";
import Row from "./Row";
import Cell from "./Cell";
import LoadingPage from "../../Loading/LoadingPage";
import { LANG } from "../../../services/config";

const Table = ({rowStyle=[], columns = [], data = [], keyField, addClass = "", sortField = "", sortOrder = "", emptyTable = null, loading = false }) => {
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
                {!loading && <tbody>
                    {data.map((item,index) => (
                        <Row rowStyle={rowStyle} key={index} columns={columns} data={item} headerFormatter={false} />
                    ))}
                    {data.length === 0 && emptyTable && (
                        <tr>
                            <td colSpan={columns.length} className="Table-emptyTable">{emptyTable}</td>
                        </tr>
                    )}
                </tbody>}
                {loading &&
                    <tr>
                        <td colSpan={columns.length} className="Table-emptyTable"><div><LoadingPage loadingTable={true} effload={true} message={LANG.GLOBAL.loading}/></div></td>
                    </tr>
                
                
                      
                    
                
                 }
            </table>
        </div>
    );
};

export default Table;
