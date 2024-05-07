import React, {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import defaultImg from './../../img/default_profile.png';
import './cards.css';
let categoriesStr = "";

  
const Card = (props)=>{

    const CategoriesData = ({category, index})=>{
        
        return (
            <div></div>
        // <div className="category__circle" title={category.text} style={{backgroundColor: category.color}}>

        // </div>
        )
    }
    const CategoriesMas = ({pos})=>{
        if(!Array.isArray(pos) || pos == false || pos == null) return;
        categoriesStr =  pos.map((post,index)=>{
        return <CategoriesData key={index} category={post} index={index}/>
        })  
        return categoriesStr;
    } 

    return(
        <div className="card">
            <div className="card__img">
                <div className="card__img__img">
                    <img src={`${ props.info.profileImg ? props.info.profileImg.link : defaultImg}`} alt="" />
                </div>
                <div className="card__categories">
                    <div className="card__categories__inner">
                        <span className="card__id">{props.info.id}</span>
                        <CategoriesMas pos = {props.info.categories == undefined ? false : props.info.categories}/> 
                    </div>   
                </div>
            </div>
            <div className="card__info">
                <div className="card__case__name">
                    <h2><NavLink to={"/case/" + props.info.id}>{`${props.info.name}`}</NavLink></h2>
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
                        <p dangerouslySetInnerHTML= {{__html:props.info.potreba}} />
                    </div>
                </div>
                <div className="card__info__status">
                    <div>
                        {/* {props.info.numberDogovir.length > 0?<p>№ <b>{props.info.numberDogovir}</b></p>:""} */}
                    </div>
                    <div className="card__info__status__date">
                        <p>{props.info.createdDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;