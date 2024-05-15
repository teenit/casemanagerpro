import React, { useRef } from "react";
import s from "./caseslist.module.css";
import { useReactToPrint } from "react-to-print";
import printImg from './../../img/icons/print-black-50.png';
const CasesList = ({cases, categories})=>{
const componentRef = useRef();

const pageStyle =`

`;
const handlerPrint = useReactToPrint({
    content: ()=>componentRef.current,
    pageStyle:pageStyle
})
    return(
        <>
        <div className={s.wrap} ref={componentRef}>
            <table >
                <thead>
                    <tr className={s.tr}>
                        <td>№ кейсу</td>
                        <td>ПІБ</td>
                        <td>Телефон</td>
                        <td>Пошта</td>
                        <td>Дата нар-ня</td>
                        <td>Адреса (факт)</td>
                        <td>Категорія</td>
                    </tr>
                </thead>
                <tbody>
            {
                cases.map((item,index)=>{

                    return(
                       
                            <tr key={item.id} className={s.item}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{`${item.phone1} ${item.phone2}`}</td>
                                <td>{item.email}</td>
                                <td style={{whiteSpace:"nowrap"}}>{item.happyBD}</td>
                                <td><span dangerouslySetInnerHTML={{__html:item.addressLive}} /></td>
                                <td>{
                                    categories.map((elem)=>{
                                        if (item.categories.indexOf(elem.id) !== -1 )  return <span key={elem.id} >{elem.name}</span>
                                    })
                                    }
                                </td>
                            </tr>
                        
                    )
                })
            }
            </tbody>
            </table>
            
        </div>
        <button className={s.btn__print} onClick={handlerPrint}> <img className={s.print__img} src={printImg} /> Друк</button></>
    )
}
export default CasesList;