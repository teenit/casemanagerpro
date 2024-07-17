import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./get-user.module.css";
const GetUsers = ({ type, id, users }) => {
    return type !== "case" ? (
        <div className={s.users__wrap}>
            <div className={s.users__inner}>
                {
                    users.map((item, index) => {
                        return item.userID !== 0 ? (
                            <div key={index + item.userID} className={`${s.result} ${s.result__constant}`}>
                                <p><NavLink to={`/user?${item.userID}`}>{item.userName}</NavLink></p>
                                <div className={s.result__left}>
                                    {item?.position ? <p>{item.position}</p> : null}
                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                </div>

                            </div>
                        ) : (
                            <div key={index} className={s.result}>
                                <p>{item.userName}</p>
                                <div className={s.result__left}>
                                    {item?.position ? <p>{item.position}</p> : null}
                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                </div>


                            </div>
                        )

                    })
                }
            </div>
        </div>
    ) : (
        <div className={s.users__wrap}>
            <div className={s.users__inner}>
                {
                    users.map((item, index) => {
                        return item.userID !== 0 ? (
                            <div key={index + item.userID} className={`${s.result} ${s.result__constant}`}>
                                <p><NavLink to={`/case/${item.userID}`}>{item.userName}</NavLink></p>
                                <div className={s.result__left}>
                                    {item?.position ? <p>{item.position}</p> : null}
                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                </div>


                            </div>
                        ) : (
                            <div key={index} className={s.result}>
                                <p>{item.userName}</p>
                                <div className={s.result__left}>
                                    {item?.position ? <p>{item.position}</p> : null}
                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                </div>


                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default GetUsers;