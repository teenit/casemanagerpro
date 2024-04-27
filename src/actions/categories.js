import { apiResponse } from "../components/Functions/get_apiObj";

export const SET_CATEGORIES = 'SET_CATEGORIES';

 const getCategories = (data) => ({
  type: SET_CATEGORIES,
  payload: data,
});


export function loadCategories () {
    apiResponse({},"manage/get-all-categories.php").then((data)=>{
        if (data.status) getCategories(data.data)
    });
}