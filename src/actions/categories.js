import { apiResponse } from "../components/Functions/get_apiObj";

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = (data) => ({
  type: SET_CATEGORIES,
  payload: data,
});

export function loadCategories () {
    return (dispatch, getState) => { 

        const { auth } = getState();
        if (auth.auth) {
            apiResponse({},"manage/get-all-categories.php").then((data)=>{
                if (data.status) dispatch(setCategories(data));
            });
        }
    };
}
