import React, { useRef } from "react";
import s from "./caseslist.module.css";
import { useReactToPrint } from "react-to-print";
import printImg from './../../img/icons/print-black-50.png';
import { LANG } from "../../services/config";
import { Button } from "@mui/material";
import Icon from "../elements/Icons/Icon"
import { NavLink } from "react-router-dom";
import AccessCheck from "../Functions/AccessCheck";
const CasesList = ({ cases, categories, loadMoreCases, maxLength }) => {
    const componentRef = useRef();
    const pageStyle = `

`;
    const caseCategories = (catMas) => {
        const mas = [];
        if (catMas) {
            categories.forEach((item) => {
                if (catMas.includes(item.id)) {
                    mas.push(item.name);
                }
            });
            return mas.join(", ");
        } else {
            return LANG.casesList.noCategory
        }
    };

    const handlerPrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle
    })
    return (
        <>
            <div className={s.wrap} ref={componentRef}>
                <table className="Table">
                    <thead>
                        <tr>
                            <td>{LANG.casesList.caseNumber}</td>
                            <td>{LANG.casesList.pib}</td>
                            <td>{LANG.casesList.phone}</td>
                            <td>{LANG.casesList.email}</td>
                            <td>{LANG.casesList.birthday}</td>
                            <td>{LANG.casesList.address}</td>
                            <td>{LANG.casesList.categories}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cases.map((item, index) => {
                                return (

                                    <tr key={item.id} className={s.item}>
                                        <td>{item.id}</td>
                                        <td><NavLink to={"/case/" + item.id}>{item.name}</NavLink></td>
                                        <td>
                                            <NavLink to={`tel:${item.phone1}`}>{item.phone1} </NavLink>
                                            <NavLink to={`tel:${item.phone2}`}>{item.phone2}</NavLink>
                                        </td>
                                        <td><NavLink to={`mailto:${item.email}`}>{item.email}</NavLink></td>
                                        <td style={{ whiteSpace: "nowrap" }}>{item.happyBD}</td>
                                        <td><span dangerouslySetInnerHTML={{ __html: item.addressLive }} /></td>
                                        <td><span>{caseCategories(item.categories)}</span></td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
            {cases.length < maxLength && <Button variant="contained" onClick={loadMoreCases}>Показати ще</Button>}
            {AccessCheck('yes_no', 'a_page_cases_print') && <Button variant="contained" className="btn__print" onClick={handlerPrint}> <Icon icon={"print"} /><span>Друк</span></Button>}
        </>
    )
}
export default CasesList;