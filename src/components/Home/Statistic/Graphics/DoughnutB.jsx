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
    Legend
    
  } from 'chart.js'
  import { Doughnut } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  )
  const DoughnutB = ({data,options})=>{
    return(
        <div className="test">
             <h2 className={s.title__graph}>Доступне місце на сервері</h2>
            <Doughnut
                data={data}
                options={options}
            ></Doughnut>
        </div>
    )
  }

  export default DoughnutB;