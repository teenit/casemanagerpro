import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/Slices/userSlice";
import { useAuth } from "../../hooks/use-auth";
import { NavLink } from "react-router-dom";
import { Check } from "../Auth/Check";
import Modal from "../Contacts/Modal/Modal";
import AddReportHistory from "./AddReportHistory/AddReportHistory";
import { useRef } from "react";
import { useEffect } from "react";
const ShowLogin = ({ togleProfileMeny }) => {

  const [showModal, changeModal] = useState(false);
  const [typeBtn, changeTypeBtn] = useState("");

  const toggleModal = (e) => {
    changeModal(!showModal);
    // togleProfileMeny();

    if (e) {
      changeTypeBtn(e.target.dataset.id);
    }
  };

  const dispatch = useDispatch();
  const { isAuth, email, data, userName, id } = useAuth();

  return isAuth ? (
    <div className="menu__profile__inner">
      <div className="prof__access__header">
        <div>
          <a className={"prof__access__header__link"} href={`/user?${id}`}>
            {userName}
          </a>
        </div>

         {false ? <button type="button" data-id="report" onClick={toggleModal}>
          Подати звіт
        </button> : ""}
        {false ? <button type="button" data-id="hictory" onClick={toggleModal}>
          Подати історію
        </button> :""}

        <div>
          <button onClick={() => dispatch(removeUser())}>Вийти</button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={toggleModal}>
          <AddReportHistory typeBtn={typeBtn} toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  ) : (
    <div className="access__header">
      <div>
        <NavLink className={"prof__access__header__link"} to={"logIn"}>
          {" "}
          Увійти{" "}
        </NavLink>
      </div>
    </div>
  );
};
export default ShowLogin;
