import React, { useState, useEffect } from "react";
import ProfilePhoto from "./UserInfo/ProfilePhoto";
import { fetchUser, fetchReport, fetchHistory } from "../../services/user-api";
import UserReportHistory from "./UserReport/UserReportHistory";
import UserCasesList from "./UserCasesList/UserCasesList";
import LoadingPage from "../Loading/LoadingPage";
import { apiResponse } from "../Functions/get_apiObj";
import AccessCheck from "../Functions/AccessCheck";

const User = () => {
  const [user, setUser] = useState({});
  const [report, setReport] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentPageReport, setCurrentPageReport] = useState(1);
  const [casesPerPageReport] = useState(6);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const [casesPerPageHistory] = useState(6);
  const [selectedReport, setSelectedReport] = useState(1);
  const [selectedHistory, setSelectedHistory] = useState(1);
  const [changePass, setChangePass] = useState(false)

  useEffect(() => {
    let userId = window.location.href.charAt(window.location.href.indexOf("?")+1)
    apiResponse({userId:userId}, "user/get-user.php").then((data) => {
      if(userId==localStorage.getItem("id") && AccessCheck('yes_no', 'a_page_user_change_pass')){
        setChangePass(true)
      }
      setUser(data);
      console.log(user);
    });

    // fetchReport().then(setReport);
    // fetchHistory().then(setHistory);
  }, []);
console.log(user);
  const paginateReport = (pageNumber) => {
    setCurrentPageReport(pageNumber);
    setSelectedReport(pageNumber);
  };

  const paginateHistory = (pageNumber) => {
    setCurrentPageHistory(pageNumber);
    setSelectedHistory(pageNumber);
  };

  const lastCaseIndexReport = currentPageReport * casesPerPageReport;
  const firstCaseIndexReport = lastCaseIndexReport - casesPerPageReport;
  const currentReport = report.slice(firstCaseIndexReport, lastCaseIndexReport);

  const lastCaseIndexHistory = currentPageHistory * casesPerPageHistory;
  const firstCaseIndexHistory = lastCaseIndexHistory - casesPerPageHistory;
  const currentHistory = history.slice(firstCaseIndexHistory, lastCaseIndexHistory);

  return user && !user?.fail ? (
    <div className="User">
      <ProfilePhoto
        url={user.profileUrl}
        userName={user.userName}
        email={user.email}
        changePass={changePass}
        phone={user.phone}
      />
      <UserCasesList />

      <div>
        <h4>Подані звіти</h4>
        <UserReportHistory
          currentArray={currentReport}
          casesPerPage={casesPerPageReport}
          arrey={report}
          paginate={paginateReport}
          activeKey={selectedReport}
        />
      </div>

      <div>
        <h4>Подані історії</h4>
        <UserReportHistory
          currentArray={currentHistory}
          casesPerPage={casesPerPageHistory}
          arrey={history}
          paginate={paginateHistory}
          activeKey={selectedHistory}
        />
      </div>
    </div>
  ) : (
    <div>
      {user?.userName ? (
        <ProfilePhoto
          url={user.profileUrl}
          userName={user.userName}
          email={user.email}
          phone={user.phone}
        />
      ) : (
        <div>
          <div className="page__loading">
            <LoadingPage effload={false} message={"Доступ обмежено"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
