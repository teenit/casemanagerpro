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
    Legend,
    RadialLinearScale,
    Filler
    
  } from 'chart.js'
  import { Bar, Line, Bubble, Pie, Radar } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler
  )
const BarG = ({data,options})=>{
    return(
        <div>
            <Bar 
                data={data}
                options = {options}  
              ></Bar>
        </div>
    )
  }

  export default BarG;