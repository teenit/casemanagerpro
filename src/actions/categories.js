import { apiResponse } from "../components/Functions/get_apiObj";

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = (data) => ({
  type: SET_CATEGORIES,
  payload: data,
});

export function loadCategories () {
    return dispatch => { // Додаємо параметр dispatch для відправки дії до редуктора
        apiResponse({},"manage/get-all-categories.php").then((data)=>{
            if (data.status) dispatch(setCategories(data)); // Викликаємо setCategories за допомогою dispatch
        });
    };
}
