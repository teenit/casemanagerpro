import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import AccessCheckCases from "../Functions/AccessCheckCases";

function sortMas(field, type) {
  if (type === "number") {
    return (a, b) => +a[field] > +b[field] ? 1 : -1;
  } else {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }
}

const GetCases = ({ posts, postsChange }) => {
  const categories = useSelector(state => state.categories.case);
  const check = AccessCheckCases(posts);
  const [postsState, setPostsState] = useState((check.look.length > check.edit.length) ? check.look : check.edit);
  const [cases, setCases] = useState({
    totalCount: postsState ? postsState.length:0,
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
    let sortedPosts;
    if (value !== 'id') {
      sortedPosts = [...postsState].sort(sortMas(value, 'string'));
    } else {
      sortedPosts = [...postsState].sort(sortMas(value, 'number'));
    }
    setSelectFilter(value);
    setMasPost(sortedPosts.slice(0, cases.lastSlice));
    postsChange(sortedPosts);
  };
  console.log(check);
  const editIds = check.edit.map(item=>item.id)
  return (
    <div className="wrap__cards">
      {AccessCheck('yes_no', 'a_page_cases_sort') && (
        <Select value={selectFilter} onChange={(e) => handleSelect(e.target.value)}>
          <MenuItem value="default">Сортувати за</MenuItem>
          {/* <MenuItem value="surname">Сортувати за прізвище</MenuItem> */}
          <MenuItem value="name">Сортувати за ім'ям</MenuItem>
          <MenuItem value="createdDate">Від нового до старого</MenuItem>
          <MenuItem value="id">Сортувати за номером</MenuItem>
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
              <Card edit = {editIds} info={elem} key={ind} categories={categories} />
            ))}
          </div>
          {cases.button ? (
            <Button variant="contained" onClick={loadMoreCases}>Показати ще</Button>
          ) : (
            <h3 className={s.look__more__text}>Немає більше доступних кейсів</h3>
          )}
        </div>
      ) : (
        <CasesList cases={postsState} categories={categories} />
      )}
    </div>
  );
};

export default GetCases;
