import React, { useState } from "react";
import loadImg from "./../../../img/loading_3.gif";
import Icon from "../../elements/Icons/Icon";
import { NavLink } from "react-router-dom";

const FileSearch = ({ files, filterFiles }) => {
    const [active, setActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [results, setResults] = useState(null);
    const [searchStr, setSearchStr] = useState("");

    const handleSearch = (value) => {
        if(value.length<0) return filterFiles(files)
        let res = []
        // let checkTags = files.filter(item => item.tags.some(tag => tag.includes(value)))
        files.forEach(item => {
            if (item.title.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())) {
                res.push(item)
            }
        });
        console.log(res);
        
        filterFiles(res)
    };
    

    // const Result = ({ elems }) => {
    //     return (
    //         <div className="Result">
    //             {elems.map((item, ind) => (
    //                 <div className="Result-item" key={ind}>
    //                     <div className="Result-item-name">
    //                         <NavLink to={`/file/${item.id}`}>{item.title}</NavLink>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <div className={active ? "FileSearch FileSearch-active" : "FileSearch"}>
            <div className={active ? "FileSearch-inner FileSearch-inner-active" : "FileSearch-inner"}>
                <input
                    className="FileSearch-input"
                    type="text"
                    onChange={(e) => {
                        const value = e.target.value.trim();
                            handleSearch(value);                        
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
            {/* {results && active && searchStr ? (
                <div className="FileSearch-results">
                    <Result elems={results} />
                </div>
            ) : null} */}
        </div>
    );
};

export default FileSearch;
