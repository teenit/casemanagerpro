import React, { useState, useEffect } from "react";
import ProfilePhoto from "./UserInfo/ProfilePhoto";
import UserCasesList from "./UserCasesList/UserCasesList";
import LoadingPage from "../Loading/LoadingPage";
import { apiResponse } from "../Functions/get_apiObj";
import AccessCheck from "../Functions/AccessCheck";
import { useParams } from "react-router-dom";
import defaultImg from "../../img/default_profile.png"
import { useSelector } from "react-redux";
import NotFound from "../pages/NotFound";
import { LANG } from "../../services/config";
const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const access = {
    check_pass: AccessCheck('yes_no', 'a_page_user_change_pass'),
    view_others: AccessCheck('yes_no', "a_page_user_users"),
  }
  const params = useParams()
  const currentUserId = useSelector(state => state.user.id);
  const getUser = () => {
    setLoading(true)
    apiResponse({ userId: params.id }, "user/get-user.php").then((data) => {
      if (params.id == currentUserId && access.check_pass) {
        setChangePass(true)
      }
      setUser({ ...data });
      setLoading(false)
    });
  }
  useEffect(() => {
    getUser()
  }, [params.id]);

  return loading ? (
    <LoadingPage effload={true} message={LANG.GLOBAL.loading} />
  ) : (!user.status || (user.id !== currentUserId && !access.view_others)) ? (
    <NotFound effload={true} message={"Доступ обмежено"} />
  ) : (
    <div className="User">
      {user.status && (
        <ProfilePhoto
          url={
            user?.profileUrl?.link === "/default-img.png"
              ? defaultImg
              : user.profileUrl.link
          }
          getUser={getUser}
          changePass={changePass}
          user={user}
        />
      )}
      {user.id === currentUserId && <UserCasesList userAddId={user.id} />}
    </div>
  );

};

export default User;
