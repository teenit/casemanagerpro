import React, {useState, useEffect} from "react";
import axios from "axios";
import {serverAddres} from "../../../Functions/serverAddres"
import RouteNavLink from "../../../Modals/RouteNavLink";
import ModalError from "../../Add-case/ModalErrors";
import s from "./edit.module.css"
import Input from "../../../elements/Inputs/Input";
import Textarea from "../../../elements/Inputs/Textarea";
import { StyledEngineProvider } from "@mui/material";
let categoriesStr = "";
let masCategories = [];


const EditCaseInfo = ({caseInfo,close})=>{

    const send = async(data)=>{
        data.userId = localStorage.getItem("id");
        data.caseId = window.location.search.slice(1);
        data.id = localStorage.getItem("id");
        data.token = localStorage.getItem("token");
        
        for (var key in data) {
            if(typeof data[key] == 'string' && data[key] !== "") data[key] = data[key].replaceAll("'", "’").replaceAll(/\n/g, "<br />");
          }
     //  return console.log(data);
        await fetch(serverAddres("case/save-infoCase.php"),{
            method:"POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            body:  JSON.stringify(data)
        })
            .then(res => res.text())
            .then(data => {
                console.log(data)
                alert("ОНОВЛЕНО")
            })
            .catch(rejected => {
                console.log(rejected);
            });
    }
   console.log(caseInfo.categories)

    const [addObj, setAddObj] = useState({
        surname: caseInfo.surname.replaceAll("<br />", '\n'),
        firstName: caseInfo.firstName.replaceAll("<br />", '\n'),
        secondName: caseInfo.secondName.replaceAll("<br />", '\n'),
        phone1: caseInfo.phone1.replaceAll("<br />", '\n'),
        phone2: caseInfo.phone2.replaceAll("<br />", '\n'),
        email: caseInfo.email.replaceAll("<br />", '\n'),
        addressPropiska: caseInfo.addressPropiska.replaceAll("<br />", '\n'),
        addressLive: caseInfo.addressLive.replaceAll("<br />", '\n'),
        chanelComunity: caseInfo.chanelComunity.replaceAll("<br />", '\n'),
        firstContact: caseInfo.firstContact,
        familyStan: caseInfo.familyStan.replaceAll("<br />", '\n'),
        potreba: caseInfo.potreba.replaceAll("<br />", '\n'),
        commentar: caseInfo.commentar.replaceAll("<br />", '\n'),
        dateDogovir: caseInfo.dateDogovir,
        numberDogovir: caseInfo.numberDogovir.replaceAll("<br />", '\n'),
        happybd: caseInfo.happybd,
        year: caseInfo?.month ? caseInfo.year : +caseInfo.happybd.slice(0,4),
        month: caseInfo?.month ? caseInfo.month : caseInfo.happybd.slice(5,7) - 1,
        day: caseInfo?.day ? caseInfo.day : +caseInfo.happybd.slice(8),
        categories:[],
        familyHistory:caseInfo.familyHistory.replaceAll("<br />", '\n')
    })
    const Check = ()=>{
        let ers = []
        let cat = 0;
        let cats = [];
        if(addObj.surname == "") ers.push("Введіть прізвище кейсу");
        if(addObj.firstName == "") ers.push("Введіть ім'я кейсу");
        if(addObj.phone1 == "") ers.push("Введіть номер телефону 1");
        if(addObj.firstContact == "") ers.push("Введіть дату першого контакту");
        for(let i=0;i<addObj.categories.length;i++){
            if(addObj.categories[i].active){
                cat++
                cats.push(addObj.categories[i]);
            };
        }
        if(cat == 0) ers.push("Оберіть категорію кейса")
        if(ers.length > 0) return setErrors(ers)

        addObj.categories = cats;
       // return console.log(addObj)
        send(addObj)
    }
    const [categoriesCase, setCategoriesCase] = useState(false)
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        
        axios({
            url: serverAddres("manage/get-categories-case.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
           console.log(data.data)
           setCategoriesCase(data.data.mas);       
        })
        .catch((error)=>console.log(error)) 
    },[])
    function checkedCat(arg){
        let cat = false;
        caseInfo.categories.map((elem)=>{
            if(elem.value == arg){
                cat = true;
            }
        })
        return cat;
    }
    const CategoriesData = ({category, index})=>{
        addObj.categories[index] = {
            value: category.value,
            text: category.text,
            color:category.color,
            active:checkedCat(category.value)
        }
        return (
            <div className="add__case__item__inner__category__item">
                <input className="checkbox__category" type="checkbox"
                    onChange={(e)=>{
                        console.log(addObj)
                        addObj.categories[index] = {
                            value: category.value,
                            text: category.text,
                            color:category.color,
                            active:e.target.checked
                        }
                    }}
                    defaultChecked={checkedCat(category.value)}
                    value={category.value} id={`cat${index}`} />
                <label className="checkbox__category__label" htmlFor={`cat${index}`}>{category.text}</label>
                <input type="hidden" className="checkbox__category__hidden" value={category.color}/>
            </div>
    
        )
    }
    const CategoriesMas = (pos, lf)=>{
        if(pos.length < 1 || pos == false) return;
                categoriesStr =  pos.map((post,index)=>{
                return <CategoriesData lf={lf} key={index} category={post} index={index}/>
        })  
    }  
    const [errors,setErrors] = useState(null)
    const [goToCase, setToCase] = useState(null)
    return(
        <div className="modal__wrap__add">
        <div className={s.close}
            onClick={()=>{
                close()
            }}>
            <span></span>
            <span></span>
        </div>
        <div className="wrap__add__case">
        
        <div className="add__case__inner">
            <div className="add__case__line">
                <div className="add__case__line__three">
                <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone1">Прізвище<span className="color__red">*</span></label>
                            <Input required value={addObj.surname} onChange={(e)=>{
                                setAddObj({...addObj,surname:e.target.value})
                                console.log(e.target.value)
                    }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone1">Ім'я<span className="color__red">*</span></label>
                            <Input required value={addObj.firstName} onChange={(e)=>{
                                setAddObj({...addObj,firstName:e.target.value})
                                console.log(e.target.value)
                    }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone1">По батькові <span className="color__red">*</span></label>
                            <Input required value={addObj.firstName} onChange={(e)=>{
                                setAddObj({...addObj,firstName:e.target.value})
                                console.log(e.target.value)
                    }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__three">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone1">Номер телефону 1 <span className="color__red">*</span></label>
                            <Input type="text" id="phone1" name="phone1" value={addObj.phone1}
                            onChange={(e)=>{
                                setAddObj({...addObj,phone1:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone2">Номер телефону 2</label>
                            <Input type="text" id="phone2" name="phone2" value={addObj.phone2}
                            onChange={(e)=>{
                                setAddObj({...addObj,phone2:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="email">Email</label>
                            <Input type="text" id="email" name="email" value={addObj.email}
                            onChange={(e)=>{
                                setAddObj({...addObj,email:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__three">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="happybd">Дата народження</label>
                            <Input type="date" id="happybd" name="happybd" value={addObj.happybd}
                            onChange={(e)=>{
                                let year = e.target.value.slice(0,4)
                                let month = e.target.value.slice(5,7)
                                let day = e.target.value.slice(8)
                                setAddObj({...addObj,happybd:e.target.value,
                                    day:+day,
                                    month:month - 1,
                                    year:+year
                                })
                                
                            
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__two">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="addressPropiska">Адреса по прописці</label>
                            <Textarea name="addressPropiska" id="addressPropiska" cols="30" rows="10" value={addObj.addressPropiska}
                            onChange={(e)=>{
                                setAddObj({...addObj,addressPropiska:e.target.value})
                                console.log(e.target.value)
                            }}></Textarea>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="addressLive">Адреса фактичного проживання</label>
                            <Textarea name="addressLive" id="addressLive" cols="30" rows="10" value={addObj.addressLive}
                            onChange={(e)=>{
                                setAddObj({...addObj,addressLive:e.target.value})
                                console.log(e.target.value)
                            }}></Textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__three">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="chanelComunity">Канал комунікації</label>
                            <Input type="text" id="chanelComunity" name="chanelComunity" value={addObj.chanelComunity}
                            onChange={(e)=>{
                                setAddObj({...addObj,chanelComunity:e.target.value})
                                console.log(e.target.value)
                            }}/> 
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="firstContact">Дата першого контакту <span className="color__red">*</span></label>
                            <Input type="date" id="firstContact" name="firstContact" value={addObj.firstContact}
                            onChange={(e)=>{
                                setAddObj({...addObj,firstContact:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="potreba">Потреба, запит</label>
                            <Textarea name="potreba" id="potreba" cols="30" rows="10" value={addObj.potreba}
                            onChange={(e)=>{
                                setAddObj({...addObj,familyStan:e.target.value})
                                console.log(e.target.value)
                            }}></Textarea>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="familyStan">Сімейний стан, деталі про сім'ю, її слад</label>
                            <Textarea id="familyStan" name="familyStan" cols="30" rows="10" value={addObj.familyStan}
                            onChange={(e)=>{
                                setAddObj({...addObj,familyStan:e.target.value})
                                console.log(e.target.value)
                            }} ></Textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="familyHistory">Історія сім'ї / особи</label>
                            <Textarea id="familyHistory" name="familyHistory" cols="30" rows="10" value={addObj.familyHistory}
                            onChange={(e)=>{
                                setAddObj({...addObj,familyHistory:e.target.value})
                                console.log(e.target.value)
                            }} ></Textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__two">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="" className="add__case__name__of__block">Категорія кейсу <span className="color__red">*</span></label>
                            <div className="add__case__item__inner__category">
                                {CategoriesMas(categoriesCase)}
                                {categoriesStr}
                            </div>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="" className="add__case__name__of__block">Договір</label>
                            <div className="add__case__item__inner__input__item">
                                <label htmlFor="dateDogovir">Дата підписання договору</label>
                                <Input type="date" name="dateDogovir" id="dateDogovir" value={addObj.dateDogovir}
                                onChange={(e)=>{
                                    setAddObj({...addObj,dateDogovir:e.target.value})
                                    console.log(e.target.value)
                                }}/>
                            </div>
                            <div className="add__case__item__inner__input__item">
                                <label htmlFor="numberDogovir">Номер договору</label>
                                <Input type="text" name="numberDogovir" id="numberDogovir" value={addObj.numberDogovir}
                                onChange={(e)=>{
                                    setAddObj({...addObj,numberDogovir:e.target.value})
                                    console.log(e.target.value)
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="commentar">Коментар до кейсу</label>
                            <Textarea name="commentar" id="commentar" cols="30" rows="10" value={addObj.commentar}
                            onChange={(e)=>{
                                setAddObj({...addObj,commentar:e.target.value})
                                console.log(e.target.value)
                            }}></Textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <button onClick={Check} className="primary__btn">Зберегти</button>
            </div>
            
        </div>
        {goToCase ? <RouteNavLink link={goToCase.link} message={goToCase.message} text={goToCase.text} func={()=>{setToCase(null)}}/> : null}
        {errors ? <ModalError errors={errors} func = {()=>{
            setErrors(null)
        }}/> : null}
    </div>
    </div>
    )
}


export default EditCaseInfo;