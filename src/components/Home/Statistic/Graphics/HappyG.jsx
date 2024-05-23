import React from "react";
import s from './style.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    BarElement,
    Legend
    
  } from 'chart.js'
  import { Bar, Line, Bubble, Pie } from "react-chartjs-2";
import { useState } from "react";
import moment from "moment";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement
  )
  const HappyG = ({data,options})=>{
    const [mas,setMas] = useState(Array(12).fill(0))
    // data.map((item)=>{
    //   mas[moment(item.happybd).format('M') - 1] += 1;
    // })
    // const [bib,setBib] = useState( {
    //   labels: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
    //   datasets: [{
    //       label: 'Дні народження кейсів',
    //       data: mas,
    //       borderWidth: 1,
    //       backgroundColor: ["#93baf4","#83a6dc","#91f5a9","#7fd693","#71bd83","#c4f091","#aed681","#96b96e","#f0d98d","#dbc680","#b7a569","#7595c5"],
    //     }]
    // })
    return(
        <div>
            <h2 className={s.title__graph}>Дні народження кейсів по місяцях</h2>
            <Bar data={data} options={options}></Bar>
        </div>
    )
  }

  export default HappyG;