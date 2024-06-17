import React, { Component } from "react";
import ProfilePhoto from "./UserInfo/ProfilePhoto";
import "./user.css";

import { fetchUser, fetchReport, fetchHistory } from "../../services/user-api";

import UserReportHistory from "./UserReport/UserReportHistory";
import UserCasesList from "./UserCasesList/UserCasesList";
import LoadingPage from "../Loading/LoadingPage";

export class User extends Component {
  state = {
    user: {},
    report: [],
    history: [],
    currentPageReport: 1,
    casesPerPageReport: 6,
    currentPageHistory: 1,
    casesPerPageHistory: 6,
    selectedReport: 1,
    selectedHistory: 1,
  };

  componentDidMount() {
    fetchUser().then((data) => {
      this.setState({ user: data });
    });

    // fetchReport().then();
    //fetchHistory().then();
  }

  paginateReport = (pageNumber) => {
    this.setState({
      currentPageReport: pageNumber,
      selectedReport: pageNumber,
    });
  };

  paginateHistory = (pageNumber) => {
    this.setState({
      currentPageHistory: pageNumber,
      selectedHistory: pageNumber,
    });
  };

  render() {
    const {
      currentPageReport,
      casesPerPageReport,
      currentPageHistory,
      casesPerPageHistory,
      report,
      history,
      selectedReport,
      selectedHistory,
    } = this.state;
    const lastCaseIndexReport = currentPageReport * casesPerPageReport;
    const firstCaseIndexReport = lastCaseIndexReport - casesPerPageReport;

    const lastCaseIndexHistory = currentPageHistory * casesPerPageHistory;
    const firstCaseIndexHistory = lastCaseIndexHistory - casesPerPageHistory;

    const currentReport = report.slice(
      firstCaseIndexReport,
      lastCaseIndexReport
    );
    const currentHistory = history.slice(
      firstCaseIndexHistory,
      lastCaseIndexHistory
    );

    const { user } = this.state;
    return user && !user?.fail ? (
      <div className="User">
        <ProfilePhoto
          url={user.profileUrl}
          userName={user.userName}
          email={user.email}
          changePass = {user?.changePass}
          phone = {user.phone}
        />
        <UserCasesList id={user.id} />

        <div>
          <h4>Подані звіти</h4>
          <UserReportHistory
            currentArray={currentReport}
            casesPerPage={casesPerPageReport}
            arrey={report}
            paginate={this.paginateReport}
            activeKey={selectedReport}
          />
        </div>

        <div>
          <h4>Подані історії</h4>
          <UserReportHistory
            currentArray={currentHistory}
            casesPerPage={casesPerPageHistory}
            arrey={history}
            paginate={this.paginateHistory}
            activeKey={selectedHistory}
          />
        </div>
      </div>
    ):(
       <div>
        {user?.userName ?
        <ProfilePhoto
          url={user.profileUrl}
          userName={user.userName}
          email={user.email}
          phone = {user.phone}
        /> : <div>
          <div className="page__loading">
          <LoadingPage effload={false} message = {"Доступ обмежено"} />

          </div>
          </div>}
        </div>
    )
  }
}

export default User;
