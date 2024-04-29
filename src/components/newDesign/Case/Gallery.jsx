import React, { useEffect, useState } from 'react'
import { LANG } from '../../../services/config'

const Gallery = ({photos}) => {
const [width, setWidth] = useState(0)
const [imgRows, setImgRows] = useState(0)
const [imgColumns, setImgColumns] = useState(0)
const handleRowsChange = (value)=>{
    setImgRows(value)
}

useEffect(()=>{
    setWidth(window.innerWidth)
    let rows = Math.ceil(photos.length/3)
    handleRowsChange(rows)
},[photos])
// const columnAmount = ()=>{
//     if(width<=850 && width>=600){
//         set
//     }
// }
console.log(imgRows);
    return (
        <div className='Gallery'>
            <h1>{LANG.gallery}</h1>
            <div className='Gallery-grid' style={{
                gridTemplateRows: `repeat(${imgRows},1fr)`
            }}>
                {photos.map((item,index)=>{
                    return(
                        <div className='Gallery-grid-img-wrap' key={index}>
                            <img src={item.link} alt="Фотографія" />
                        </div>
                    )
                })}
            </div>
            <h1>{LANG.documents}</h1>
            <table className='Gallery-documents'>
                <thead>
                    <tr>
                        <td>Назва</td>
                        <td>Тип</td>
                        <td>Розмір</td>
                        <td>Додано</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>

            </table>
        </div>
    )
}

export default Gallery