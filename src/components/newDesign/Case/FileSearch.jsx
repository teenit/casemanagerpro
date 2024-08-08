import React, { useState } from "react";
import loadImg from "./../../../img/loading_3.gif";
import Icon from "../../elements/Icons/Icon";
import { NavLink } from "react-router-dom";

const FileSearch = ({ files }) => {
    const [active, setActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [results, setResults] = useState(null);
    const [searchStr, setSearchStr] = useState("");

    const handleSearch = (value) => {
        let res = []
        let checkTags = files.filter(item => item.tags.some(tag => tag.includes(value)))
        files.forEach(item => {
            if (item.title.includes(value) || item.description.includes(value) || checkTags.includes(item)) {
                res.push(item)
            }
        });
    
        setResults(res)
    };
    

    const Result = ({ elems }) => {
        return (
            <div className="Result">
                {elems.map((item, ind) => (
                    <div className="Result-item" key={ind}>
                        <div className="Result-item-name">
                            <NavLink to={`/file/${item.id}`}>{item.title}</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={active ? "FileSearch FileSearch-active" : "FileSearch"}>
            <div className={active ? "FileSearch-inner FileSearch-inner-active" : "FileSearch-inner"}>
                <input
                    className="FileSearch-input"
                    type="text"
                    onChange={(e) => {
                        const value = e.target.value.trim();
                        if (value.length > 0) {
                            handleSearch(value);
                        }
                        setSearchStr(value);
                    }}
                />
                {load ? (
                    <img src={loadImg} className="FileSearch-img" alt="Loading" />
                ) : (
                    <span className="FileSearch-icon" onClick={() => {
                        setActive(!active);
                        setResults(null);
                    }}>
                        <Icon icon={"search"} addClass={"black-icon fs40"} />
                    </span>
                )}
            </div>
            {!active && (
                <span className="FileSearch-icon" onClick={() => setActive(!active)}>
                    <Icon icon={"search"} addClass={"black-icon fs40"} />
                </span>
            )}
            {results && active && searchStr ? (
                <div className="FileSearch-results">
                    <Result elems={results} />
                </div>
            ) : null}
        </div>
    );
};

export default FileSearch;
