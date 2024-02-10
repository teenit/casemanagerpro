import axios from "axios";
import { serverAddres } from "../components/Functions/serverAddres";

let fetchObj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
};

export const AmountCases = () => {
    return axios({
      url: serverAddres("statistics/amount-cases.php"),
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(fetchObj),
    }).then((response) => {
        return response.data
    });
  };
  export const getSize = () => {
    return axios({
      url: serverAddres("statistics/get-size.php"),
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(fetchObj),
    }).then((response) => {
        return response.data
    });
  };
  export const getCategoriesStat = () => {
    return axios({
      url: serverAddres("manage/get-categories-case.php"),
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(fetchObj),
    }).then((response) => {
        return response.data
    });
  };


  export const getCasesHappy = () => {
    return axios({
      url: serverAddres("statistics/get-cases-hb.php"),
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(fetchObj),
    }).then((response) => {
        return response.data
    });
  };

