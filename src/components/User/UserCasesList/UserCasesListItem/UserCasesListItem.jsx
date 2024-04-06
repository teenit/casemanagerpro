import React from "react";
import { NavLink } from "react-router-dom";

const UserCasesListItem = ({ id, surname, firstName }) => {
  return (
    <>
      <p>№ {id}</p>
    
        <NavLink to = {"/case?" + id}>
        {surname} {firstName}
      </NavLink>
    </>
  );
};

export default UserCasesListItem;
