import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserCasesListItem from "./UserCasesListItem/UserCasesListItem";
import UserPagination from "./UserPagination/UserPagination";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import AccessCheckCases from "../../Functions/AccessCheckCases";
import { LANG } from "../../../services/config";

const UserCasesList = ({ userAddId }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage, setCasesPerPage] = useState(width < 720 ? 4 : 12);
  const [selected, setSelected] = useState(1);

  const [createdCasesPage, setCreatedCasesPage] = useState(1);
  const [createdCasesSelected, setCreatedCasesSelected] = useState(1);
  const [createdCasesPerPage, setCreatedCasesPerPage] = useState(width < 720 ? 4 : 12);
 

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      const casesPerPage = window.innerWidth < 720 ? 4 : 12;
      setCasesPerPage(casesPerPage);
      setCreatedCasesPerPage(casesPerPage);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    apiResponse({}, "case/get/cases-page-list.php").then((res) => {
      console.log(res)
      setCases([...res.list]);
    });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelected(pageNumber);
  };

  const paginateCreatedCases = (pageNumber) => {
    setCreatedCasesPage(pageNumber);
    setCreatedCasesSelected(pageNumber);
  };

  const addCases = cases.filter((item) => item.user_id === +userAddId);
  const lastCaseIndex = currentPage * casesPerPage;
  const firstCaseIndex = lastCaseIndex - casesPerPage;
  const accessCases = AccessCheckCases(cases).look;
  const currentCase = accessCases.slice(firstCaseIndex, lastCaseIndex);

  const lastCreatedCaseIndex = createdCasesPage * createdCasesPerPage;
  const firstCreatedCaseIndex = lastCreatedCaseIndex - createdCasesPerPage;
  const currentCreatedCases = addCases.slice(firstCreatedCaseIndex, lastCreatedCaseIndex);
  return (
    <>

      <div className="added_contact">
        <div className="added_contact_wrap">
          <h4 className="added_contact_title">{LANG.user_case_list.title}</h4>
          <Button>
            <NavLink to="/add-case">{LANG.user_case_list.add}</NavLink>
          </Button>
        </div>
        <ul className="added_contact_list">
          {currentCreatedCases.map(({ id, name }) => (
            <li className="added_contact_list_item" key={id}>
              <UserCasesListItem id={id} name={name} />
            </li>
          ))}
        </ul>
        {addCases.length > createdCasesPerPage && (
          <UserPagination
            casesPerPage={createdCasesPerPage}
            totalCases={addCases.length}
            paginate={paginateCreatedCases}
            activeKey={createdCasesSelected}
          />
        )}
      </div>

      <div className="added_all_contact">
        <h4 className="added_contact_title">{LANG.user_case_list.avaible}</h4>

        <ul className="added_contact_list">
          {currentCase.map(({ id, name }) => (
            <li className="added_contact_list_item" key={id}>
              <UserCasesListItem id={id} name={name} />
            </li>
          ))}
        </ul>

        {accessCases.length > casesPerPage && (
          <UserPagination
            casesPerPage={casesPerPage}
            totalCases={cases.length}
            paginate={paginate}
            activeKey={selected}
          />
        )}
      </div>
    </>
  );
};

export default UserCasesList;
