import React, {useEffect, useState} from "react";
import imgDelete from "./../../../img/icons/delete-48.png";
import editImg from "./../../../img/icons/edit-50.png";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import LoadingPage from "../../Loading/LoadingPage";
import { apiResponse } from "../../Functions/get_apiObj";
import Icon from "../../elements/Icons/Icon";

let categoriesStr = "";
const SetCategories = ({cats})=>{
    const [categoriesCase, setCategoriesCase] = useState(false)
    const [page, setPage] = useState({loading:true,effload:false,message:""})
    const [state, setState] = useState({
        nameOfCategory:"",
        colorOfCategory:"#ffa800"
    })
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
            if(data.data?.message){
                setPage({loading:true,effload:false,message:data.data.message})
                setCategoriesCase(data.data.mas);  
              }else{
                 setCategoriesCase(data.data.mas);
                  setPage({loading:false,effload:true})
              }  
              cats(data.data.mas)    
        })
        .catch((error)=>console.log(error)) 
    },[])
        function transliterate(key){
            var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","ъ":"i","Ъ":"i","'":"i","б":"b","ю":"yu"," ":"99"," ":"","і":"i","І":"I"};
            key = key.replace(/ /g,'');
            return key.split('').map(function (char) { 
            return a[char] || char; 
          }).join("");
        }
    function deleteCategory(arg){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            category: arg
        }
        axios({
            url: serverAddres("manage/delete-categories-case.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setCategoriesCase(data.data);
        })
        .catch((error)=>console.log(error)) 
    }
    function addNewCategory(id){
        apiResponse({
            text: state.nameOfCategory.trim().replaceAll("'", "’"),
            color: state.colorOfCategory
        },"manage/add-categories-case.php").then((data)=>{
            console.log(data)
        })
    }
    const CategoriesData = ({category, index})=>{
        return (
        <div className={`set__categories__case__list__category ${index % 2 == 0 ?  "arc":""}`}>
            <div className="set__categories__case__list__category__title">
                <div className="category__circle" style={{backgroundColor: category.color}}></div>
                <span>{category.text}</span>
            </div>
            <div className="set__categories__case__control" onClick={()=>{deleteCategory(category)}}>
                <Icon icon={"delete"} addClass={"default-icon"}/>
            </div>
        </div>
        )
    }
    const CategoriesMas = (pos)=>{
        if(pos.length < 1 || pos == false) return;
                categoriesStr =  pos.map((post,index)=>{
                return <CategoriesData key={index} category={post} index={index}/>
        })  
    }    

    return(
        <div className="wrap__set__categories__case">
            <div className="inner__set__categories__case">
                <div className="set__categories__case__title">
                    <h2>
                        Категорії кейсів
                    </h2>
                   
                </div>
                {!page.loading ? <div className="set__categories__case__control">
                    <div className="set__categories__case__control__inp">
                        <input value={state.nameOfCategory} title="Нова категорія" type="text" id="set__categories__case__control__inp" placeholder={"Назва категорії"} onChange={((e)=>setState({...state, nameOfCategory:e.target.value}))}/>
                        <input value={state.colorOfCategory} title="Колір категорії" type="color" name="colorBackground" id="colorBackground" onChange={((e)=>setState({...state, colorOfCategory:e.target.value}))}/>
                    </div>
                    <div className="set__categories__case__control__btn">
                        <button className="primary__btn padding20px"
                        onClick={()=>{addNewCategory("set__categories__case__control__inp")}}>Додати нову категорію</button>
                    </div>
                </div>:<div className="block__loading">
                            <LoadingPage message={page.message} effload = {page.effload}/>
                        </div>}
                <div className="set__categories__case__list">
                        {CategoriesMas(categoriesCase)}
                        {categoriesStr}
                </div>
            </div>
        </div>
    )
}
export default SetCategories;