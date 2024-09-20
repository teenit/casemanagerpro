import { apiResponse } from "../components/Functions/get_apiObj";

export const SET_USER_PERM = 'SET_AUTH_USER';
export const SET_AUTH_USER = 'SET_AUTH_USER';

export const setUserPerm = (data) => ({
  type: SET_USER_PERM,
  payload: data,
});
export const setUserAuth = (data) => ({
    type: SET_AUTH_USER,
    payload: data,
  });

export function loadUserAuth () {
    return dispatch => { // Додаємо параметр dispatch для відправки дії до редуктора
        apiResponse({},"check-auth.php").then((data)=>{
            if (data.status) {
                dispatch(setUserPerm(data));
            } else {
                dispatch(setUserAuth({auth: false}));
            }

        });
    };
}
