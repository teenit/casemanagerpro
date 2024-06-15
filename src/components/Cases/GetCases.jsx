import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function sortMas(field, type) {
  if (type === "number") {
    return (a, b) => +a[field] > +b[field] ? 1 : -1;
  } else {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }
}

const GetCases = ({ posts, postsChange }) => {
  const categories = useSelector(state => state.categories.case);
  const [cases, setCases] = useState({
    totalCount: posts.length,
    firstSlice: 0,
    lastSlice: 20,
    step: 10,
    button: true
  });
  const [likeShow, setLikeShow] = useState(true);
  const [masPost, setMasPost] = useState([]);
  const [selectFilter, setSelectFilter] = useState("default")
  useEffect(() => {
    loadMoreCases();
  }, []);

  function loadMoreCases() {
    let countStart = cases.firstSlice;
    let countEnd = cases.lastSlice;
    
    setMasPost(prevMasPost => [...prevMasPost, ...posts.slice(countStart, countEnd)]);
    if (countEnd > cases.totalCount) {
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
      sortedPosts = [...posts].sort(sortMas(value, 'string'))
    } else {
      sortedPosts = [...posts].sort(sortMas(value, 'number'))
    }
    setSelectFilter(value)
    setMasPost(sortedPosts.slice(0, cases.lastSlice))
    postsChange(sortedPosts)
  };

  return (
    <div className="wrap__cards">
      <div className={s.select__sort}>
        <Select value={selectFilter}  onChange={(e) => { handleSelect(e.target.value) }}>
          <MenuItem value="default">Сортувати за</MenuItem>
          <MenuItem value="surname">Сортувати за прізвище</MenuItem>
          <MenuItem value="firstName">Сортувати за ім'ям</MenuItem>
          <MenuItem value="createdDate">Сортувати за датою створення</MenuItem>
          <MenuItem value="id">Сортувати за номером</MenuItem>
        </Select>
        <button onClick={() => setLikeShow(!likeShow)} className={s.like__btn}>
          {!likeShow ? "Як картки" : "Як список"}
        </button>
      </div>
      {likeShow ? (
        <div className={s.like__cards}>
          <div className="inner__cards" id="inner__cards">
            {masPost.map((elem, ind) => (
              <Card info={elem} key={elem.id} categories={categories} />
            ))}
          </div>
          {cases.button ? (
            <button className={s.look__more} onClick={loadMoreCases}>Показати ще...</button>
          ) : (
            <h3 className={s.look__more__text}>Немає більше доступних кейсів</h3>
          )}
        </div>
      ) : (
        <CasesList cases={posts} categories={categories} />
      )}
    </div>
  );
};

export default GetCases;
