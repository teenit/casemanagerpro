import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import AccessCheckCases from "../Functions/AccessCheckCases";
import defaultImg from "../../img/default_profile.png";
import { serverAddres } from "../Functions/serverAddres";
import moment from "moment";

function sortMas(field) {
  return (a, b) => {
    if (field === "default" || field === "contractNumber") {
      return a["id"] - b["id"];
    } else if (field === "id") {
      return b["id"] - a["id"];
    } else if (field === "categories") {
      const hasCategoriesA = a["categories"] && a["categories"].length > 0;
      const hasCategoriesB = b["categories"] && b["categories"].length > 0;
      if (hasCategoriesA && !hasCategoriesB) {
        return -1
      } else if (!hasCategoriesA && hasCategoriesB) {
        return 1
      } else if (hasCategoriesA && hasCategoriesB) {
        return a["categories"][0] - b["categories"][0];
      } else {
        return 0;
      }
    } else if (field === "name") {
      return a["name"].localeCompare(b["name"])
    } else {
      return a[field] > b[field] ? 1 : -1;
    }
  };
}


const GetCases = ({ posts, postsChange, loadCasesMore, showLoadMore = true }) => {
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
  

  const editIds = check.edit.map(item => item.id);
  const images = {
    male: [serverAddres("media/default/m-young.png"), serverAddres("media/default/m-middle.png"), serverAddres("media/default/m-old.png")],
    female: [serverAddres("media/default/f-young.png"), serverAddres("media/default/f-middle.png"), serverAddres("media/default/f-old.png")],
    other: [serverAddres("media/default/o-young.png"), serverAddres("media/default/o-middle.png"), serverAddres("media/default/o-old.png")],
    default: defaultImg
}
const howOldIsCase = (birthday) => {
  const birthDate = moment(birthday);
  const age = moment().diff(birthDate, 'years');
  return age;
};
const getImage = (data) => {
  if (!data && !data?.profileImg?.link) return images.default
  if (data?.profileImg?.link) return data.profileImg.link
  if (data && data?.sex && data.sex.trim().length>0) {
      const age = howOldIsCase(data.happyBD)
      if (age) {
          if (age < 18) {
              return images[data.sex][0]
          }
          if (age >= 18 && age <= 50) {
              return images[data.sex][1]
          }
          return images[data.sex][2]
      }else return images[data.sex][1]

  }
  return images.default
};
  return (
    <div className="wrap__cards">
      
      {true ? (
        <div className={s.like__cards}>
          <div className="inner__cards" id="inner__cards">
            {posts.map((elem, ind) => (
              <Card img={getImage(elem)} edit={editIds} info={elem} key={ind} categories={categories} />
            ))}
          </div>
        </div>
      ) : (
        <CasesList maxLength={posts.length} loadMoreCases={loadMoreCases} cases={masPost} categories={categories} />
      )}
    </div>
  );
};

export default GetCases;
