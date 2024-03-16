import React from "react";
import phoneImg from "../../../../img/icons/iphone-90.png"
import socialImg from "../../../../img/icons/social-100.png"
import givingImg from "../../../../img/icons/giving-100.png"
import emailImg from "../../../../img/icons/email-100.png"
import addressImg from "../../../../img/icons/address-100.png"
import dateImg from "../../../../img/icons/date-100.png"

const CaseShortInfo = ({info})=>{

    return(
        <div className="case__info">
            <div className="case__info__inner">
                <div className="case__info__card">
                    <div className="case__info__card__img">
                        <img src={phoneImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        
                       <span><p title="Номер телефону 1"><a href={`tel:${info.phone1}`}>{info.phone1}</a></p></span>
                    </div>
                </div>
                {info.phone2.length > 1 ? <div className="case__info__card">
                <div className="case__info__card__img">
                        <img src={phoneImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p><a href={`tel:${info.phone2}`}>{info.phone2}</a></p></span>
                    </div>
                </div>:null
                }
                {info.email.length > 1 ? <div className="case__info__card">
                    <div className="case__info__card__img">
                        <img src={emailImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span>
                            <p><a href={`mailto:${info.email}`}>{info.email}</a></p>
                        </span>
                        
                    </div>
                </div>:null}
                {info.happybd.length > 1 ? <div className="case__info__card">
                    <div className="case__info__card__img">
                        <img src={dateImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span>
                            <p>{info.happybd}</p>
                        </span>
                        
                    </div>
                </div>:null}
                
            
          
            
                {info.addressPropiska.length > 1 ?<div className="case__info__card">
                    <div className="case__info__card__img">
                        <img src={addressImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p title="Адреса по прописці" dangerouslySetInnerHTML= {{__html:info.addressPropiska}} /></span>
                    </div>
                </div>:null}
                {info.addressLive.length > 1 ? <div className="case__info__card">
                <div className="case__info__card__img">
                        <img src={addressImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p title="Фактична адреса проживання" dangerouslySetInnerHTML= {{__html:info.addressLive}} /></span>
                    </div>
                </div>:null}
                {info.familyStan.length > 1 ? <div className="case__info__card">
                <div className="case__info__card__img">
                        <img src={addressImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p title="Сімейний стан" dangerouslySetInnerHTML= {{__html:info.familyStan}}></p></span>
                    </div>
                </div>:null}
                {info.commentar.length > 1 ? <div className="case__info__card">
                <div className="case__info__card__img">
                        <img src={addressImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p title="Коментар" dangerouslySetInnerHTML= {{__html:info.commentar}} /></span>
                    </div>
                </div>:""}
                {info.potreba.length > 1 ?
                <div className="case__info__card">
                <div className="case__info__card__img">
                        <img src={givingImg} alt="" />
                    </div>
                    <div className="case__info__card__text">
                        <span><p title="Потреба" dangerouslySetInnerHTML= {{__html:info.potreba}} /></span>
                    </div>
                </div>:null}
            </div>           
            <div className="case__info__inner__right">
                <div className="case__info__text__center">
                    <div className="case__info__card">
                        <div className="case__info__card__img">
                            <img src={dateImg} alt="" />
                        </div>
                        <div className="case__info__card__text">
                            <p>Дата створення</p>
                            <span>
                                <p>{info.createdDate}</p>
                            </span>
                            
                        </div>
                    </div>   
                </div>
                <div className="case__info__text__center">                             
                
                    <div className="case__info__card">
                        <div className="case__info__card__img">
                            <img src={socialImg} alt="" />
                        </div>
                        <div className="case__info__card__text">   
                            <p>Договір</p>
                            <span>
                                <p>{info.numberDogovir < 1 ? "Договір не укладено" : info.dateDogovir + " № " + info.numberDogovir }</p>                                
                            </span> 
                        </div>
                    </div>
                </div>
                <div className="case__info__text__center">                             
                
                    {info.chanelComunity.length > 1 ? <div className="case__info__card">
                        <div className="case__info__card__img">
                            <img src={socialImg} alt="" />
                        </div>
                        <div className="case__info__card__text">  
                            <p>Канал комунікації</p>   
                            <span><p>{info.chanelComunity}</p></span>
                        </div>
                    </div>:null}
                </div>
                <div className="case__info__text__center">                             
                
                    <div className="case__info__card">
                        <div className="case__info__card__img">
                            <img src={socialImg} alt="" />
                        </div>
                        <div className="case__info__card__text"> 
                            <p>Категорія</p>    
                            <span>{info.categories.map((elem,ind)=>{
                                return(
                                    <p key={ind}
                                        style={{
                                            color:elem.color
                                        }}
                                    >{elem.text}</p>
                                )
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseShortInfo;