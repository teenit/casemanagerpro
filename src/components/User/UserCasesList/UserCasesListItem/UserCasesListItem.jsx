import React from "react";
import { NavLink } from "react-router-dom";

const UserCasesListItem = ({ id, name }) => {
  return (
    <>
      <p>№ {id}</p>
        <NavLink to = {"/case/" + id}>
        {name}
      </NavLink>
    </>
  );
};

export default UserCasesListItem;
