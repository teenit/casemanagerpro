import React, {useState, useEffect} from "react";
import axios from "axios";
import {serverAddres} from "./../../Functions/serverAddres";
import "./add-case.css";
import ModalError from "./ModalErrors";
import RouteNavLink from "../../Modals/RouteNavLink";

let categoriesStr = "";


const AddCase = ()=>{
    const send = async(data)=>{  
        data.userId = localStorage.getItem("id");
        data.token = localStorage.getItem("token");
       // return console.log(data);
            axios({
                url: serverAddres("add-first-case.php"),
                method: "POST",
                header : {'Content-Type': 'application/json;charset=utf-8'},
                data : JSON.stringify(data),
            })
            .then((data)=>{ 
               // return console.log(data.data)
                if(data.data?.message) return alert(data.data.message)  
                setToCase({
                    link:"/case?"+ data.data,
                    text:"Перейти до кейсу",
                    message: "Кейс успішно створено"
                })
            })
            .catch((error)=>console.log(error)) 
    }
    const [addObj, setAddObj] = useState({
        surname: "",
        firstName: "",
        secondName: "",
        phone1: "",
        phone2: "",
        email: "",
        addressPropiska: "",
        addressLive: "",
        chanelComunity: "",
        firstContact: "",
        familyStan: "",
        potreba: "",
        commentar: "",
        dateDogovir: "",
        numberDogovir: "",
        happybd: "",
        categories:[],
        familyHistory:""
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
    const CategoriesData = ({category, index})=>{
        addObj.categories[index] = {
            value: category.value,
            text: category.text,
            color:category.color,
            active:false
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
        <div className="wrap__add__case">
        <div className="add__case__inner">
            <div className="add__case__line">
                <div className="add__case__line__three">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="surname">Прізвище <span className="color__red">*</span></label>
                            <input type="text" id="surname" name="surname"
                            onChange={(e)=>{
                                setAddObj({...addObj,surname:e.target.value})
                                console.log(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="firstName">Ім'я <span className="color__red">*</span></label>
                            <input type="text" id="firstName" name="firstName"
                            onChange={(e)=>{
                                setAddObj({...addObj,firstName:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="secondName">По батькові</label>
                            <input type="text" id="secondName" name="secondName"
                            onChange={(e)=>{
                                setAddObj({...addObj,secondName:e.target.value})
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
                            <input type="text" id="phone1" name="phone1"
                            onChange={(e)=>{
                                setAddObj({...addObj,phone1:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="phone2">Номер телефону 2</label>
                            <input type="text" id="phone2" name="phone2"
                            onChange={(e)=>{
                                setAddObj({...addObj,phone2:e.target.value})
                                console.log(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email"
                            onChange={(e)=>{
                                setAddObj({...addObj,email:e.target.value})
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
                            <label htmlFor="happybd">Дата народження</label>
                            <input type="date" id="happybd" name="happybd"
                            onChange={(e)=>{
                                setAddObj({...addObj,
                                    happybd:e.target.value,
                                    year: +e.target.value.slice(0,4),
                                    month:e.target.value.slice(5,7) - 1,
                                    day: +e.target.value.slice(8),
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
                            <textarea name="addressPropiska" id="addressPropiska" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,addressPropiska:e.target.value})
                                console.log(e.target.value)
                            }}></textarea>
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="addressLive">Адреса фактичного проживання</label>
                            <textarea name="addressLive" id="addressLive" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,addressLive:e.target.value})
                                console.log(e.target.value)
                            }}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__three">
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="chanelComunity">Канал комунікації</label>
                            <input type="text" id="chanelComunity" name="chanelComunity" 
                            onChange={(e)=>{
                                setAddObj({...addObj,chanelComunity:e.target.value})
                                console.log(e.target.value)
                            }}/> 
                        </div>
                    </div>
                    <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="firstContact">Дата першого контакту <span className="color__red">*</span></label>
                            <input type="date" id="firstContact" name="firstContact" 
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
                            <textarea name="potreba" id="potreba" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,familyStan:e.target.value})
                                console.log(e.target.value)
                            }}></textarea>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="familyStan">Сімейний стан, деталі про сім'ю, її слад</label>
                            <textarea id="familyStan" name="familyStan" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,familyStan:e.target.value})
                                console.log(e.target.value)
                            }} ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <div className="add__case__line__one">
                <div className="add__case__item">
                        <div className="add__case__item__inner__input">
                            <label htmlFor="familyHistory">Історія сім'ї / особи</label>
                            <textarea id="familyHistory" name="familyHistory" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,familyHistory:e.target.value})
                                console.log(e.target.value)
                            }} ></textarea>
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
                                <input type="date" name="dateDogovir" id="dateDogovir" 
                                onChange={(e)=>{
                                    setAddObj({...addObj,dateDogovir:e.target.value})
                                    console.log(e.target.value)
                                }}/>
                            </div>
                            <div className="add__case__item__inner__input__item">
                                <label htmlFor="numberDogovir">Номер договору</label>
                                <input type="text" name="numberDogovir" id="numberDogovir" 
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
                            <textarea name="commentar" id="commentar" cols="30" rows="10"
                            onChange={(e)=>{
                                setAddObj({...addObj,commentar:e.target.value})
                                console.log(e.target.value)
                            }}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add__case__line">
                <button onClick={Check} className="primary__btn">Додати кейс</button>
            </div>
        </div>
        {goToCase ? <RouteNavLink link={goToCase.link} message={goToCase.message} text={goToCase.text} func={()=>{setToCase(null)}}/> : null}
        {errors ? <ModalError errors={errors} func = {()=>{
            setErrors(null)
        }}/> : null}
    </div>
    )
}


export default AddCase;