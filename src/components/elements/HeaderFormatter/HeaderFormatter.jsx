import React from "react";
import Icon from "../Icons/Icon";

const HeaderFormatter = ({ text, sortField, sortOrder, dataField, onSortClick = () => {} }) => {
    const isActive = sortField === dataField;

    return (
        <div className={`HeaderFormatter ${isActive ? "active" : ""}`}>
            <div className="HeaderFormatter-text">{text}</div>
            <div onClick={()=>{
                onSortClick(dataField, 'DESC' == sortOrder ? 'ASC' : 'DESC')
            }} className={`HeaderFormatter-arrow`}>
                {sortOrder === 'ASC' ? <Icon icon="arrow_down_sort" /> : <Icon icon="arrow_up_sort" />}
            </div>
            {/* <div className="HeaderFormatter-arrows">
                <div
                    className={`HeaderFormatter-arrows-arrow ${isActive && sortOrder === 'ASC' ? "active" : ""}`}
                    onClick={() => onSortClick(dataField, 'ASC')}
                >
                    <Icon icon="arrow_down_sort" />
                </div>
                <div
                    className={`HeaderFormatter-arrows-arrow ${isActive && sortOrder === 'DESC' ? "active" : ""}`}
                    onClick={() => onSortClick(dataField, 'DESC')}
                >
                    <Icon icon="arrow_up_sort" />
                </div>
            </div> */}
        </div>
    );
};

export default HeaderFormatter;
