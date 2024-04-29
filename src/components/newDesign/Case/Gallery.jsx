import React, { useEffect, useState } from 'react'
import { LANG } from '../../../services/config'

const Gallery = ({ photos }) => {
    const [imgRows, setImgRows] = useState(0)
    const handleRowsChange = (value) => {
        setImgRows(value)
    }

    useEffect(() => {
        let rows = Math.ceil(photos.length / 3)
        handleRowsChange(rows)
    }, [photos])

    const getType = (str) => {
        let newStr = ""
        let slashindex = str.indexOf("/") + 1
        newStr = str.slice(slashindex, str.length)
        return newStr
    }

    function convertSize(size) {
        if (size < 1024 * 1024) {
            var sizeInKB = size / 1024;
            return sizeInKB.toFixed(2) + " KB";
        }
        else {
            var sizeInMB = size / (1024 * 1024);
            return sizeInMB.toFixed(2) + " MB";
        }
    }

    return (
        <div className='Gallery'>
            <h1>{LANG.gallery}</h1>
            <div className='Gallery-grid' style={{
                gridTemplateRows: `repeat(${imgRows},1fr)`
            }}>
                {photos.map((item, index) => {
                    return (
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
                    </tr>
                </thead>
                <tbody>
                    {photos.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{getType(item.type)}</td>
                                <td>{convertSize(item.size)}</td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
        </div>
    )
}

export default Gallery