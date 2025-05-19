import { apiResponse } from "../components/Functions/get_apiObj";

export const SET_FIELDS = 'SET_FIELDS';

export const setFields = (data) => ({
  type: SET_FIELDS,
  payload: data,
});

export function loadFields () {
    return (dispatch, getState) => { // Додаємо параметр dispatch для відправки дії до редуктора
        const { auth } = getState();
        if (auth.auth) {
        apiResponse({},"manage/fields/get-structure-list.php").then((data)=>{
            if (data.status) dispatch(setFields(data.fields)); // Викликаємо setFields за допомогою dispatch
        });
        }
    };
}
