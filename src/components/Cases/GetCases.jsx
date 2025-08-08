import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
import { useSelector } from "react-redux";
import defaultImg from "../../img/default_profile.png";
import { serverAddres } from "../Functions/serverAddres";
import moment from "moment";

// Функция сортировки
function sortMas(field) {
  return (a, b) => {
    if (field === "default" || field === "contractNumber") {
      return a.id - b.id;
    } else if (field === "id") {
      return b.id - a.id;
    } else if (field === "categories") {
      const hasA = a.categories?.length > 0;
      const hasB = b.categories?.length > 0;
      if (hasA && !hasB) return -1;
      if (!hasA && hasB) return 1;
      if (hasA && hasB) return a.categories[0] - b.categories[0];
      return 0;
    } else if (field === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a[field] > b[field] ? 1 : -1;
    }
  };
}

const GetCases = ({ posts, postsChange, loadCasesMore, showLoadMore = true }) => {
  const categories = useSelector(state => state.categories.case);

  const [postsState, setPostsState] = useState([...posts]);
  const [cases, setCases] = useState({
    totalCount: postsState.length,
    firstSlice: 0,
    lastSlice: 20,
    step: 10,
    button: true
  });
  const [masPost, setMasPost] = useState([]);
  const [selectFilter, setSelectFilter] = useState("default");


  const images = {
    male: [
      serverAddres("media/default/m-young.png"),
      serverAddres("media/default/m-middle.png"),
      serverAddres("media/default/m-old.png")
    ],
    female: [
      serverAddres("media/default/f-young.png"),
      serverAddres("media/default/f-middle.png"),
      serverAddres("media/default/f-old.png")
    ],
    other: [
      serverAddres("media/default/o-young.png"),
      serverAddres("media/default/o-middle.png"),
      serverAddres("media/default/o-old.png")
    ],
    default: defaultImg
  };

  const howOldIsCase = birthday => {
    if (!birthday) return null;
    const birthDate = moment(birthday);
    return moment().diff(birthDate, "years");
  };

  const getImage = data => {
    if (!data) return images.default;

    if (data.profileImg?.link) return data.profileImg.link;

    if (data.sex?.trim()) {
      const age = howOldIsCase(data.happyBD);
      if (age !== null) {
        if (age < 18) return images[data.sex][0];
        if (age <= 50) return images[data.sex][1];
        return images[data.sex][2];
      }
      return images[data.sex][1];
    }

    return images.default;
  };

  useEffect(() => {
    loadMoreCases();
  }, []);

  function loadMoreCases() {
    const { firstSlice, lastSlice, totalCount, step } = cases;
    setMasPost(prev => [...prev, ...postsState.slice(firstSlice, lastSlice)]);
    if (lastSlice >= totalCount) {
      setCases(prev => ({ ...prev, button: false }));
    } else {
      setCases(prev => ({
        ...prev,
        firstSlice: lastSlice,
        lastSlice: lastSlice + step
      }));
    }
  }

  const handleSelect = value => {
    const sortedPosts = [...postsState].sort(sortMas(value));
    setSelectFilter(value);
    setMasPost(sortedPosts.slice(0, cases.lastSlice));
    postsChange(sortedPosts);
  };

  return (
    <div className="wrap__cards">
      {true ? (
        <div className={s.like__cards}>
          <div className="inner__cards" id="inner__cards">
            {postsState.map((elem, ind) => (
              <Card
                img={getImage(elem)}
                info={elem}
                key={ind}
                categories={categories}
              />
            ))}
          </div>
        </div>
      ) : (
        <CasesList
          maxLength={postsState.length}
          loadMoreCases={loadMoreCases}
          cases={masPost}
          categories={categories}
        />
      )}
    </div>
  );
};

export default GetCases;
