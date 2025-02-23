import React from "react";
import { useState } from "react";
import searchIco from "../../../img/icons/search-black-50.png"
import searchIcoWhite from "../../../img/icons/search-50.png"
import loadImg from "./../../../img/loading_3.gif"
import s from "./search.module.css"
import { search } from "../../Functions/search";
import SearchResult from "./SearchResult";
import { serverAddres } from "../../Functions/serverAddres";
import Icon from "../../elements/Icons/Icon"
const SearchMenu = () => {
    const [active, setActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [results, setResults] = useState(null);
    const [searchStr, setSearchStr] = useState("")
    return (
        <div className={active ? `${s.search__wrap} ${s.active}` : s.search__wrap}>
            <div className={active ? `${s.search__inner__active}` : s.search__inner}>
                <input className={s.search__inp} type="text"
                    onChange={(val) => {
                        if (val.target.value.trim().length > 0) {
                            search(serverAddres("case/search.php"), val.target.value.trim(), setLoad, setResults)
                        }
                        setSearchStr(val.target.value.trim());
                    }} />
                {load ?
                    <img src={loadImg} className={s.search__img} /> :
                    <span className={s.search__icon} onClick={() => {
                        setActive(!active)
                    }}>
                        <Icon icon={"search"} addClass={`${"default-icon"} ${"fs40"}`} />
                    </span>
                }
            </div>
            {!active &&
                <span className={s.search__icon} onClick={() => {
                    setActive(!active)
                }}>
                    <Icon icon={"search"} addClass={`${"header-icon"} ${"fs40"}`} />
                </span>
            }

            {results && active && searchStr ? <div className={s.results}>
                <SearchResult elems={results} close={() => {
                    setActive(!active)
                }} />
            </div> : null}
        </div>
    )
}

export default SearchMenu;