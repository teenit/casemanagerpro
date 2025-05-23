import React, { useEffect, useState } from "react";
import axios from "axios";
import Loadpic from "../../Loading/Interactive/Loadpic";
import deleteImg from "./../../../img/icons/delete-48.png";
import bookImg from "./../../../img/icons/book-50.png";
import showImg from "./../../../img/icons/show-50.png";
import hideImg from "./../../../img/icons/hide-50.png";
import { serverAddres } from "./../../Functions/serverAddres";
import ModalMessage from "../../Modals/ModalMessage";
import Specification from "./Specification";
import { apiResponse } from "../../Functions/get_apiObj";
import { Button, MenuItem, Select } from "@mui/material";
import Icon from "../../elements/Icons/Icon";
import AccessCheck from "../../Functions/AccessCheck"
import { NavLink } from "react-router-dom";
import { LANG } from "../../../services/config";
import SetUserModal from "./SetUserModal";
import ResetPassModal from "./ResetPassModal";
let usersStr = "";


const SetUser = ({ categories, categoriesCont, addNewUser = false,closeAddNewUser }) => {
    const [users, setUsers] = useState(null);
    const [specificate, setSpecificate] = useState(null);
    const [activeSpecificate, setActiveSpecificate] = useState(false);
    const [level, setLevel] = useState({ "foo": "bar" })
    const [modal, setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [access, setAccess] = useState([]);
    const[addModal, setAddModal] = useState(false)
    const [resetPassModal,setResetPassModal] = useState({
        userId: null,
        active: false
    })
    const showName = AccessCheck("yes_no", "a_page_settings_show_name");
    const showPhone = AccessCheck("yes_no", "a_page_settings_show_phones");
    const editChangeAccess = AccessCheck("view_edit", "a_page_settings_change_accesses", "edit");
    const viewChangeAccess = AccessCheck("view_edit", "a_page_settings_change_accesses");
    function activateUser(arg, userID, text, keyt) {
        apiResponse({
            activate: arg,
            userId: userID,
            text: text,
            keyt: keyt
        }, "user/activate.php").then((res) => {
            if (res?.message) {
                setModal(true);
                return setModalInfo({ message: res.message });
            }
            window.location.reload()
        })
    }
    const loadData = () => {
        apiResponse({}, "user/get-users.php").then((res) => {
            setUsers(res);
        })
        apiResponse({}, 'access/get-list.php').then((res) => {
            setAccess(res)
        })
    }
    useEffect(() => {
        loadData();
    }, []);

    // useEffect(() => {
    //     setAddModal(addNewUser)
    // }, addNewUser);

    const selectAccess = (user_id, access_id) => {
        apiResponse({
            user_id,
            access_id
        }, "access/set-user-access.php").then((res) => {
            loadData();
        })
    }
    const resetPassModalHandler = (userId=null)=>{
        setResetPassModal({
            userId: userId,
            active: !resetPassModal.active
        })
    }
    const UsersData = ({ user, index, accessName }) => {
        return (
            <div className={`set__users__data__line ${index % 2 == 0 ? "arc" : ""}`}>
                <div className={`set__user__wr ${user.active == "true" ? "arc" : ""}`}>
                    <div>
                        {showName && <div className="set__user__name"><NavLink to={`/user/${user.id}`}>{user.userName}</NavLink></div>}
                        {showPhone && <div className=""><span>{user.phone}</span></div>}
                        <div><span>{user.email}</span></div>
                    </div>

                   {viewChangeAccess && <Select
                        value={user.access ? user.access : 0}
                        onChange={(e) => {
                            selectAccess(user.id, e.target.value)
                        }}
                        disabled={!editChangeAccess}
                    >
                        <MenuItem value={0}>{"Права не встановлено"}</MenuItem>
                        {
                            access.map((item) => {
                                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            })
                        }
                    </Select>}
                </div>

                <div className="set__user__control__panel">
                    <div className={`set__user__control__panel__icons ${user.active == "true" ? "arc" : ""}`}>
                        {/* {AccessCheck('yes_no', 'a_page_settings_remove_user') && <Icon icon={"delete"} addClass={"default-icon fs40"} />} */}

                        {/* <span onClick={() => {
                            return;
                            if (user.id == localStorage.getItem("id") || user?.type == "root") {
                                setModal(true);
                                setModalInfo({ message: "Ви не можете змінювати права доступу для цього користувача" })
                            } else {
                                changeSpecification(user)
                            }

                        }} >
                            <Icon icon={"book"} addClass={"default-icon fs35"} />
                        </span> */}
                        {user.active === "true" && AccessCheck('yes_no', 'a_page_settings_deactivate_users') ? (
                            <span onClick={() => {
                                if (user.id === localStorage.getItem("id") || user?.type === "root") {
                                    setModal(true);
                                    setModalInfo({ message: "Ви не можете деактивувати даний обліковий запис" });
                                } else {
                                    activateUser("false", user.id, "Деактивовано", "deactivateUsers");
                                }
                            }}>
                                <Icon icon={"eye"} addClass={"default-icon"} />
                            </span>
                        ) : AccessCheck('yes_no', 'a_page_settings_activate_users') ? (
                            <span onClick={() => {
                                if (user.id === localStorage.getItem("id") || user?.type === "root") {
                                    setModal(true);
                                    setModalInfo({ message: "Ви не можете активувати даний обліковий запис" });
                                } else {
                                    activateUser("true", user.id, "Активовано", "activeNewUser");
                                }
                            }}>
                                <Icon icon={"eye_off"} addClass={"default-icon"} />
                            </span>
                        ) : null}
                        <Icon icon={"reset_pass"} onClick={()=>{resetPassModalHandler(user.id)}}/>

                    </div>

                </div>

                        {resetPassModal.active && resetPassModal.userId ==user.id && <ResetPassModal userId = {user.id} successHandler={loadData} close={()=>{setResetPassModal(!resetPassModal)}}/>}
            </div>
        )
    }
const canAddUsers = AccessCheck('yes_no', 'a_page_settings_add_user')
    function changeSpecification(arg) {

        setSpecificate(arg)
        setLevel(arg.level)
        setActiveSpecificate(true);
    }
    return !users ? (

        <><Loadpic show="active" /></>
    ) : (
        <>
            <div className="set__users__wrap">
                <div className="set__users__inner">
                    {/* <div className="set__users__add">
                        <Button size="small" disabled={!canAddUsers} onClick={addModalHandler}><Icon icon={"add"}/>{LANG.set_user.add_user}</Button>
                    </div> */}
                    <div className="set__users__data">
                        <div className="set__users__data__title">
                            <div className="set__users__data__title__text">
                                <div><span>{LANG.set_user.name}</span></div>
                                <div><span>{LANG.set_user.template}</span></div>
                            </div>

                            <div className="set__users__data__title__panel">
                                <div><span>{LANG.set_user.manage}</span></div>
                            </div>
                        </div>
                        <div className="set__users__data__lines">
                            {
                                users.map((post, index) => {
                                    let accessName = ""
                                    access.forEach((item) => {
                                        if (item.id == post.access) {
                                            accessName = item.name;
                                        }
                                    })
                                    return <UsersData key={index} user={post} index={index} accessName={accessName} />
                                })
                            }
                        </div>
                    </div>
                </div>

                {activeSpecificate ? <Specification categoriesCont={categoriesCont}
                    categories={categories}
                    close={() => { setActiveSpecificate(false) }}
                    level={level}
                    user={specificate} /> : null}
            </div>
            {addNewUser && <SetUserModal successHandler={loadData} close={closeAddNewUser}/>}
            {modal && <ModalMessage header={modalInfo.message} footer={
                <Button variant="contained" onClick={() => { setModal(false) }}>{LANG.GLOBAL.close}</Button>
            }>
            </ModalMessage>}
        </>
    )
}
export default SetUser;