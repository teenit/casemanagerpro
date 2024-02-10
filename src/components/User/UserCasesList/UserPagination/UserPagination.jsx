import React from "react";

const UserPagination = ({ casesPerPage, totalCases, paginate, activeKey }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCases / casesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <ul className="user_pagination">
        {pageNumber.map((number) => (
          <li key={number}>
            <button
              className={` ${activeKey === number ? "btn__active" : ""}`}
              type="button"
              onClick={() => paginate(number)}
            >
              {/* {number} */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPagination;
