import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AmountCases, getCasesHappy, getCategoriesStat, getSize } from "../../../services/statistic-api";
import LoadingPage from "../../Loading/LoadingPage";
import LineG from "./Graphics/LineG";
import Circle from "./Graphics/Circle";

import s from "./statistics.module.css"
import DoughnutB from "./Graphics/DoughnutB";
import HappyG from "./Graphics/HappyG";
import { apiResponse } from "../../Functions/get_apiObj";
import { LANG, appConfig } from "../../../services/config";
import { useSelector } from "react-redux";
const bib =  {
  labels: [],
  datasets: [{
      label: 'Кількість категорій кейсів',
      data: [],
      borderWidth: 1,
      backgroundColor: [],
    }]
}
function dadaFunction(texts){
  let babels = [];
  let datas = [];
  let colors = [];
  for(let i = 0; i < Object.keys(texts).length; i++){
    babels[i] = texts[Object.keys(texts)[i]].text;
    datas[i] = texts[Object.keys(texts)[i]].count;
    colors[i] = texts[Object.keys(texts)[i]].color;
  }
  bib.labels = babels;
  bib.datasets[0].data = datas;
  bib.datasets[0].backgroundColor = colors;

  return true;

}

      const options = {
        maintainAspectRatio:true,
        responsive:true,
        aspectRatio:2
      }
      const a = [];
const Statistic = () =>{
    const [amountCases, setAmountCases] = useState(null);
    const [amountHappy, setAmountHappy] = useState(null);
    const [size, setSize] = useState(null);
    const [happy, setHappy] = useState(null)
    const [caseCategiries, setCaseCategories] = useState(null)
    const categories = useSelector(state => state.categories);
    const [groups, setGroups] = useState(null)
    useEffect(()=>{
        // AmountCases().then((res) => {
        //     if(res?.message) return
        //     var arr = res.mas;
        //     var result = {};
        //     var texts = {}
        //     arr.forEach(function(a){
        //         result[a.value] = result[a.value] + 1 || 1;        
        //         texts[a.value] = {
        //           text : a.text,
        //           value : a.value,
        //           color : a.color,
        //           count : result[a.value]
        //         }           
        //     });
        //     dadaFunction(texts)
        //    // setAmountCases(res.count);
        //     });
        getSize().then((res) =>{
          if(res?.message) return 
          setSize( {
            labels: ['Вільно','Зайнято'],
            datasets: [{
                label: 'MB',
                data: [res.maxSize - res.size,res.size],
                borderWidth: 1,
                backgroundColor: ["#9ccef9","#f99c9c"],
              }]
          })
        })
        // getCategoriesStat().then((data) => {
        // });
        // getCasesHappy().then((data) => {
        //   setAmountHappy(data)
        // });
        apiResponse({},"statistics/count-cases.php").then((res)=>{
          setAmountCases({
            labels: ['Створено','Доступно'],
            datasets: [{
                label: 'Доступних кейсів',
                data: [+res.count, 100 - +res.count],
                borderWidth: 1,
                backgroundColor: ["#f99c9c","#9ccef9"],
              }]
          });
          let labels = [], data = [], bgColors = [];
          categories.case.forEach((item)=>{
            labels.push(item.name)
            data.push(res.category_counts[item.id] ? res.category_counts[item.id] : 0)
            bgColors.push(item.color);
          })
          setCaseCategories({
            labels: labels,
            datasets: [{
                label: LANG.categories_case,
                data: data,
                borderWidth: 1,
                backgroundColor: bgColors,
              }]
          })
        })
        apiResponse({},"statistics/get-cases-happy-bd.php").then((res)=>{
          let labels = [], data = [], bgColors = [];
          Object.keys(res).forEach((item)=>{
            labels.push(appConfig.mounths[item].title)
            data.push(res[item].count)
            bgColors.push(appConfig.mounths[item].color)
          })
          setHappy({
            labels: labels,
            datasets: [{
                label: LANG.happy_days_cases,
                data: data,
                borderWidth: 1,
                backgroundColor: bgColors,
              }]
          })
        })
        apiResponse({},"statistics/count-group-categories.php").then((res)=>{
          if(res.status) {
            setGroups({
              labels: res.groups.map(item=>item.name),
              datasets: [{
                  label: 'Обрані групи',
                  data: res.groups.map(item=>item.count),
                  borderWidth: 1,
                  backgroundColor: res.groups.map(item=>item.color),
                }]
            });
          }
        })
       
    },[])
 
    return (
        <div className={s.home__statistic}>
            <div className={s.amount__cases__wr}>
                {/* <h2>Кількість унікальних кейсів у програмі <span className={s.amount}>{amountCases}</span></h2> */}
                <div className={s.stats__grid}>
                {caseCategiries == null ? "":<Circle data={caseCategiries} options = {options}/>}
                    {happy == null ? "":<HappyG data={happy} options = {options}/>}
                    {groups == null ? "":<Circle data={groups} options = {options}/>}
                   {/* {size == null ? "":<DoughnutB title="Доступне місце на сервері" data={size} options={options}/>}
                   {amountCases == null ? "":<DoughnutB title="Доступних кейсів" data={amountCases} options={options}/>} */}
                    {/* {caseCategiries == null ? "":<LineG data={caseCategiries} options = {options}/>} */}
                    
                    
                </div>          
            </div>
        </div>
    )
}

export default Statistic;