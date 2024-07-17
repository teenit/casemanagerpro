import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import defaultImg from './../../img/default_profile.png';
import './cards.css';
const Card = (props) => {

    const CategoriesData = ({ categories }) => {

        return (
            <div className="categories__data">
                {
                    props.categories.map((item) => {
                        if (categories.indexOf(item.id) !== -1) return <div key={item.id} className="category__circle" title={item.name} style={{ backgroundColor: item.color }} />
                    })
                }
            </div>

        )
    }

    return (
        <div className="card">
            <div className="card__img">
                <div className="card__img__img">
                    <img src={`${props.info.profileImg ? props.info.profileImg.link : defaultImg}`} alt="" />
                </div>
                <div className="card__categories">
                    <div className="card__categories__inner">
                        <span className="card__id">{props.info.id}</span>
                        {
                            props.info.categories && <CategoriesData categories={props.info.categories} />
                        }
                    </div>
                </div>
            </div>
            <div className="card__info">
                <div className="card__case__name">
                    {props.edit ? <h2><NavLink to={"/case/" + props.info.id}>{`${props.info.name}`}</NavLink></h2> :
                        <h2>{`${props.info.name}`}</h2>
                    }
                </div>
                <div className="card__description">
                    <div className="card__description__phones">
                        <a href={`"tel:"${props.info.phone1}`}>{props.info.phone1}</a>
                        <a href={`"tel:"${props.info.phone2}`}>{props.info.phone2}</a>
                    </div>
                    <div className="card__description__email">
                        <a href={`"mailto:"${props.info.email}`}>{props.info.email}</a>
                    </div>
                    <div className="card__description__potreba">
                        <p dangerouslySetInnerHTML={{ __html: props.info.potreba }} />
                    </div>
                </div>
                <div className="card__info__status">
                    <div className="card__info__status__contract">
                        {props.info.contractDate && <span>{props.info.contractDate}</span>}
                        {props.info.contractNumber && <span><b>#{props.info.contractNumber}</b></span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;