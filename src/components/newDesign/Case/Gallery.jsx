import React, { useEffect, useState } from 'react';
import { LANG } from '../../../services/config';

const Gallery = ({ photos }) => {
    const [imgRows, setImgRows] = useState(0);
    const [imagesAndVideos, setImagesAndVideos] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);

    const handleRowsChange = (value) => {
        setImgRows(value)
    };

    useEffect(() => {
        let rows = Math.ceil(photos.length / 3)
        handleRowsChange(rows)

        const imgsAndVids = photos.filter(item => {
            const type = getType(item.type)
            return type === 'image' || type === 'video'
        });
        setImagesAndVideos(imgsAndVids)

        const other = photos.filter(item => {
            const type = getType(item.type)
            return type !== 'image' && type !== 'video'
        });
        setOtherFiles(other)
    }, [photos]);

    const getType = (str) => {
        let newStr = ''
        let slashIndex = str.indexOf("/") + 1
        newStr = str.slice(slashIndex, str.length)
        return newStr;
    };

    function convertSize(size) {
        if (size < 1024 * 1024) {
            var sizeInKB = size / 1024
            return sizeInKB.toFixed(2) + " KB"
        } else {
            var sizeInMB = size / (1024 * 1024)
            return sizeInMB.toFixed(2) + " MB"
        }
    }

    return (
        <div className='Gallery'>
            <h1>{LANG.gallery}</h1>
            <div className='Gallery-grid' style={{
                gridTemplateRows: `repeat(${imgRows},1fr)`
            }}>
                {imagesAndVideos.map((item, index) => {
                    return (
                        <div className='Gallery-grid-img-wrap' key={index}>
                            <img src={item.link} alt="Фотографія" />
                        </div>
                    );
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
                    {otherFiles.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{getType(item.type)}</td>
                                <td>{convertSize(item.size)}</td>
                            </tr>
                        );
                    })}

                </tbody>

            </table>
        </div>
    );
};

export default Gallery;
