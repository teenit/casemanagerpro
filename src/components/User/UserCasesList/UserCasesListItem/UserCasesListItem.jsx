import React from "react";
import { NavLink } from "react-router-dom";

const UserCasesListItem = ({ id, surname, firstName }) => {
  return (
    <>
      <h5>№ {id}</h5>
    
        <NavLink to = {"/case?" + id}>
        {surname} {firstName}
      </NavLink>
    </>
  );
};

export default UserCasesListItem;
