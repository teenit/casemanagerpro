import React from "react";
import arrowLeft from '../../../../img/icons/slider-arrow-left.svg'
import arrowRight from '../../../../img/icons/slider-arrow-right.svg'
import { LANG } from "../../../../services/config";

const UserPagination = ({ casesPerPage, totalCases, paginate, activeKey }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCases / casesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination__wrap">
      <ul className="user_pagination">
        <div className="arrow__wrap">
          <img src={arrowLeft} alt={LANG.pagination.left} onClick={()=>{
            if(activeKey!==1){
              paginate(activeKey - 1);
            }
          }}/>
        </div>
        {pageNumber.map((number) => (
          <li key={number}>
            <button
              className={` ${activeKey === number ? "btn__active" : ""}`}
              type="button"
              onClick={() => paginate(number)}
            >
            </button>
          </li>
        ))}
        <div className="arrow__wrap">
          <img src={arrowRight} alt={LANG.pagination.right} onClick={()=>{
            if(activeKey!==pageNumber.length){
              paginate(activeKey + 1);
            }
          }}/>
        </div>
      </ul>
    </div>
  );
};

export default UserPagination;
