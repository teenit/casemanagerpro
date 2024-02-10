import React, { useRef } from "react";
import s from "./caseslist.module.css";
import { useReactToPrint } from "react-to-print";
import printImg from './../../img/icons/print-black-50.png';
const CasesList = ({cases})=>{
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
                        <td>№</td>
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
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{`${item.surname} ${item.firstName} ${item.secondName}`}</td>
                                <td>{`${item.phone1} ${item.phone2}`}</td>
                                <td>{item.email}</td>
                                <td style={{whiteSpace:"nowrap"}}>{item.happybd}</td>
                                <td><span dangerouslySetInnerHTML={{__html:item.addressLive}} /></td>
                                <td>{
                                        item.categories.map((cat,ind)=>{
                                            return(
                                                <span key={cat.value}>{cat.text} </span>
                                            )
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