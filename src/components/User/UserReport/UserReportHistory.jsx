import React from "react";
import UserPagination from "../UserCasesList/UserPagination/UserPagination";
import LoadingPage from "../../Loading/LoadingPage"
const UserReportHistory = ({
  currentArray,
  casesPerPage,
  arrey,
  paginate,
  activeKey,
}) => {
  return false ?(
    <div className="added_report">
      <ul className="added_report_list">
        {currentArray.map(({ title, date }, indx) => (
          <li key={indx} className="added_report_list_item">
            <div className="added_report_list_item_wrap">
              <span>{title}</span>
              <span>{date}</span>
            </div>
          </li>
        ))}
      </ul>

      <UserPagination
        casesPerPage={casesPerPage}
        totalCases={arrey.length}
        paginate={paginate}
        activeKey={activeKey}
      />
    </div>
  ):(
    <div className="block__loading">
      <LoadingPage effload={false} message={"Даний розділ у розробці"} />
    </div>
  );
};

export default UserReportHistory;
