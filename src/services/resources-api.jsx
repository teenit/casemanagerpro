import axios from "axios";
import { serverAddres } from "../components/Functions/serverAddres";

let fetchObj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
};

  export const getResourcesBD = () => {
    return axios({
      url: serverAddres("resources/get-resource.php"),
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(fetchObj),
    }).then((response) => {
        return response.data
    });
  };

