import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Checkbox } from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import AccessCheckCases from "../Functions/AccessCheckCases";

function sortMas(field) {
  return (a, b) => {
    if (field === "default" || field === "contractNumber") {
      return a["id"] - b["id"];
    } else if (field === "id") {
      return b["id"] - a["id"];
    } else if (field === "categories") {
      const hasCategoriesA = a["categories"] && a["categories"].length > 0
      const hasCategoriesB = b["categories"] && b["categories"].length > 0
      if (hasCategoriesA && !hasCategoriesB) {
        return -1; // а приходит первее b
      } else if (!hasCategoriesA && hasCategoriesB) {
        return 1; // b приходит первее а
      } else if (hasCategoriesA && hasCategoriesB) {
        return a["categories"][0] - b["categories"][0]
      } else {
        return 0
      }
    } else {
      return a[field] > b[field] ? 1 : -1;
    }
  };
}

const GetCases = ({ posts, postsChange }) => {
  const categories = useSelector(state => state.categories.case);
  const check = AccessCheckCases(posts);
  const [postsState, setPostsState] = useState(check.look.length > check.edit.length ? check.look : check.edit);
  const [cases, setCases] = useState({
    totalCount: postsState ? postsState.length : 0,
    firstSlice: 0,
    lastSlice: 20,
    step: 10,
    button: true
  });
  const [likeShow, setLikeShow] = useState(true);
  const [masPost, setMasPost] = useState([]);
  const [selectFilter, setSelectFilter] = useState("default");

  useEffect(() => {
    loadMoreCases();
  }, []);

  function loadMoreCases() {
    let countStart = cases.firstSlice;
    let countEnd = cases.lastSlice;

    setMasPost(prevMasPost => [...prevMasPost, ...postsState.slice(countStart, countEnd)]);
    if (countEnd >= cases.totalCount) {
      setCases(prevCases => ({ ...prevCases, button: false }));
    } else {
      setCases(prevCases => ({
        ...prevCases,
        firstSlice: countEnd,
        lastSlice: countEnd + cases.step
      }));
    }
  }

  const handleSelect = (value) => {
    let sortedPosts = [...postsState].sort(sortMas(value));
    setSelectFilter(value);
    setMasPost(sortedPosts.slice(0, cases.lastSlice));
    postsChange(sortedPosts);
  };

  console.log(check);
  const editIds = check.edit.map(item => item.id);

  return (
    <div className="wrap__cards">
      <div className="cards__filter">
        <FormControlLabel
          control={<Checkbox />}
          label="Фільтр"
        />
      </div>
      {AccessCheck('yes_no', 'a_page_cases_sort') && (
        <Select value={selectFilter} onChange={(e) => handleSelect(e.target.value)}>
          <MenuItem value="default">Від старого до нового</MenuItem>
          <MenuItem value="id">Від нового до старого</MenuItem>
          <MenuItem value="name">За ім'ям</MenuItem>
          <MenuItem value="contractNumber">За номером контракту</MenuItem>
          <MenuItem value="categories">За категорією</MenuItem>
        </Select>
      )}
      <div className={s.select__sort}>
        {AccessCheck('yes_no', 'a_page_cases_look_list') && (
          <Button variant="contained" onClick={() => setLikeShow(!likeShow)}>
            {!likeShow ? "Як картки" : "Як список"}
          </Button>
        )}
      </div>
      {likeShow ? (
        <div className={s.like__cards}>
          <div className="inner__cards" id="inner__cards">
            {masPost.map((elem, ind) => (
              <Card edit={editIds} info={elem} key={ind} categories={categories} />
            ))}
          </div>
          {cases.button ? (
            <Button variant="contained" onClick={loadMoreCases}>Показати ще</Button>
          ) : (
            <h3 className={s.look__more__text}>Немає більше доступних кейсів</h3>
          )}
        </div>
      ) : (
        <CasesList cases={masPost} categories={categories} />
      )}
    </div>
  );
};

export default GetCases;
