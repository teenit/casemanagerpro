import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserCasesListItem from "./UserCasesListItem/UserCasesListItem";
import UserPagination from "./UserPagination/UserPagination";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";

const UserCasesList = ({ userAddId }) => {
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage] = useState(12);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    apiResponse({}, "case/get/cases-page-list.php").then((res) => {
      setCases([...res])
    })
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelected(pageNumber);
  };

  const addCases = cases.filter(item => item.userId === userAddId);
  const lastCaseIndex = currentPage * casesPerPage;
  const firstCaseIndex = lastCaseIndex - casesPerPage;
  const currentCase = cases.slice(firstCaseIndex, lastCaseIndex);

  return (
    <>
      <div className="added_contact">
        <div className="added_contact_wrap">
          <h4 className="added_contact_title">Створені кейси</h4>
          <Button>
            <NavLink to="/add-case">Створити кейс</NavLink>
          </Button>
        </div>
        <ul className="added_contact_list">
          {addCases.map(({ id, name }) => (
            <li className="added_contact_list_item" key={id}>
              <UserCasesListItem
                id={id}
                name={name}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="added_all_contact">
        <h4 className="added_contact_title">Доступні кейси</h4>

        <ul className="added_contact_list">
          {currentCase.map(({ id, name }) => (
            <li className="added_contact_list_item" key={id}>
              <UserCasesListItem
                id={id}
                name={name}
              />
            </li>
          ))}
        </ul>

        <UserPagination
          casesPerPage={casesPerPage}
          totalCases={cases.length}
          paginate={paginate}
          activeKey={selected}
        />
      </div>
    </>
  );
};

export default UserCasesList;
