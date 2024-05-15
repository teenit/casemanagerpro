import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { fetchCases } from "../../../services/user-api";
import UserCasesListItem from "./UserCasesListItem/UserCasesListItem";
import UserPagination from "./UserPagination/UserPagination";
import { Button } from "@mui/material";

export class UserCasesList extends Component {
  state = {
    cases: [],
    currentPage: 1,
    casesPerPage: 12,
    selected: 1,
  };

  componentDidMount() {
    fetchCases().then((data) => {
      const cases = data.map((post) => {
        post = JSON.parse(post);
        return post;
      });
      this.setState({ cases: cases });
    });
  }

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber, selected: pageNumber });
  };

  render() {
    const { currentPage, casesPerPage, cases, selected } = this.state;

    const userAddId = this.props.id;
    const addCases = cases.filter((cases) => cases.userId === userAddId);

    // Пагінація
    const lastCaseIndex = currentPage * casesPerPage;
    const firstCaseIndex = lastCaseIndex - casesPerPage;
    const currentCase = cases.slice(firstCaseIndex, lastCaseIndex);

    return (
      <>
        <div className="added_contact">
          <div className="added_contact_wrap">
            <h4 className="added_contact_title">Створені кейси</h4>
            <Button>
            <NavLink to="/add-case">Створити кейс</NavLink></Button>
          </div>
          <ul className="added_contact_list">
            {addCases.map(({ id, firstName, surname }) => (
              <li className="added_contact_list_item" key={id}>
                <UserCasesListItem
                  id={id}
                  firstName={firstName}
                  surname={surname}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="added_all_contact">
          <h4 className="added_contact_title">Доступні кейси</h4>

          <ul className="added_contact_list">
            {currentCase.map(({ id, firstName, surname }) => (
              <li className="added_contact_list_item" key={id}>
                <UserCasesListItem
                  id={id}
                  firstName={firstName}
                  surname={surname}
                />
              </li>
            ))}
          </ul>

          <UserPagination
            casesPerPage={casesPerPage}
            totalCases={cases.length}
            paginate={this.paginate}
            activeKey={selected}
          />
        </div>
      </>
    );
  }
}

export default UserCasesList;
