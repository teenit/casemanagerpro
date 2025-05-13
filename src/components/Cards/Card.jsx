import React from "react";
import { NavLink } from 'react-router-dom';
import './cards.css';
const Card = (props) => {


    return (
        <div className="card">
            <div className="card__img">
                <div className="card__img__img">
                    <img src={props.img} alt="Фотграфія кейсу" />
                </div>
                <div className="card__categories">
                    <div className="card__categories__inner">
                        <span className="card__id">{props.info.id}</span>
                        {/* {
                            props.info.categories && <CategoriesData categories={props.info.categories} />
                        } */}
                    </div>
                </div>
            </div>
            <div className="card__info">
                <div className="card__case__name">
                   <h2><NavLink to={"/case/" + props.info.id}>{`${props.info.name}`}</NavLink></h2>
                        {/* <h2>{`${props.info.name}`}</h2> */}
                    
                </div>
                <div className="card__description">
                    <div className="card__description__phones">
                        <NavLink to={`tel:${props.info.phone1}`}>{props.info.phone1}</NavLink>
                        {/* <NavLink to={`tel:${props.info.phone2}`}>{props.info.phone2}</NavLink> */}
                    </div>
                    {/* {props.info.email && <div className="card__description__email">
                    <NavLink to={`mailto:${props.info.email}`}>{props.info.email}</NavLink>
                    </div>} */}
                    {props.info.potreba && <div className="card__description__potreba">
                        <div title={props.info.potreba} dangerouslySetInnerHTML={{ __html: props.info.potreba.slice(0,52) + (props.info.potreba.length > 50 ? "..." : "") }} />
                    </div>}
                </div>
                {(props.info.contractDate || props.info.contract_number) && <div className="card__info__status">
                    <div className="card__info__status__contract">
                        {props.info.contractDate && <span>{props.info.contractDate}</span>}
                        {props.info.contract_number && <span><b>#{props.info.contract_number}</b></span>}
                    </div>
                </div>}
                <div className="card__info__category">
                    {props.info.categories &&
                        props.categories.map((item) => {
                            if (props.info.categories.indexOf(item.id) !== -1) return <div className="card__info__category__block" style={{border: "solid 2px " + item.color}} key={item.id}>{item.name}</div>
                        })
                       

                    }    
                </div>
            </div>
        </div>
    )
}

export default Card;