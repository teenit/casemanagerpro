import { MenuItem, Select, IconButton, Typography, Box } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Icon from "../Icons/Icon";

const Pagination = ({
    page = 1,
    count = 0,
    totalCount = "hidden",
    nextPage,
    prewPage,
    rowsPerPage = 10,
    onRowsPerPageChange,
    rowsPerPageOptions = [10, 25, 50],
    loadTotalCount = () => {}
}) => {

    const changePage = (type) => {

        if (type === 'next') {
            if ((totalCount === 'hidden' || typeof totalCount !== 'number') && count >= rowsPerPage) {
                nextPage();
            } else if ( count >= rowsPerPage) {
                nextPage();
            }
        }

        if (type === 'prev' && page > 0) {
            prewPage();
        }

    };

    const startRecord = page * rowsPerPage + 1;
    const endRecord = count < rowsPerPage ? page * rowsPerPage + count : (page + 1) * rowsPerPage;

    return (
        <>
        <div className="Pagination">
            <div className="Pagination-pages">
                <div className="Pagination-pages-arrow" 
                    onClick={() => changePage('prev')} 
                    disabled={page <= 0}
                >
                    <Icon addClass={`Pagination-icon ${page <= 0 ? 'disabled' : ''}`} icon={'arrow_back'}/>
                </div>
                <div className="Pagination-pages-text">
                    <div>{startRecord} - {endRecord}</div>
                    <div>з</div>
                    <div>{typeof totalCount !== 'number' ? <Icon onClick={loadTotalCount} addClass={'Pagination-icon eye_off'} icon={'eye_off'} /> : totalCount}</div>
                </div>
                <div className="Pagination-pages-arrow" 
                    onClick={() => changePage('next')} 
                    disabled={count < rowsPerPage}
                >
                    <Icon addClass={`Pagination-icon ${count < rowsPerPage ? "disabled" : ''}`} icon={'arrow_next'}/>
                </div>
            </div>
            <div className="Pagination-limit">
                <Select
                    value={rowsPerPage}
                    onChange={(e) => onRowsPerPageChange(e.target.value)}
                    className={'Pagination-limit-select'}
                >
                    {rowsPerPageOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
        
        </>
    );
};

export default Pagination;
