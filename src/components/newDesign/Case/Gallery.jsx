import React, { useEffect, useState } from 'react';
import { LANG } from '../../../services/config';
import Modal from '../../Modals/Modal';
import OpenPhoto from '../../Galery/OpenPhoto';
import { NavLink } from 'react-router-dom';
import GetAppIcon from '@mui/icons-material/GetApp';
import VideoPlayer from "react-video-js-player";

const Gallery = ({ photos }) => {
    const [imgRows, setImgRows] = useState(0);
    const [imagesAndVideos, setImagesAndVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);
    const [openedPhoto, setOpenedPhoto] = useState({
        url:"",
        show:false
    })
    const handleRowsChange = (value) => {
        setImgRows(value)
    };

    useEffect(() => {
        let rows = Math.ceil(photos.length / 3)
        handleRowsChange(rows)

        const imgsAndVids = photos.filter(item => {
            const type = getType(item.type)
            return type === 'image'
        });
        const vidos = photos.filter(item => {
            const type = getType(item.type)
            return type === 'video'
        });
        setVideos(vidos)
        setImagesAndVideos(imgsAndVids)

        const other = photos.filter(item => {
            const type = getType(item.type)
            return type !== 'image' && type !== 'video'
        });
        setOtherFiles(other)
    }, [photos]);

    const getType = (str) => {
        let newStr = ''
        let slashIndex = str.indexOf("/")
        newStr = str.slice(0,slashIndex)
        console.log(newStr);
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
            {imagesAndVideos.length > 0 ?<>
                <h1>{LANG.gallery}</h1>
                <div className='Gallery-grid' style={{
                    gridTemplateRows: `repeat(${imgRows},1fr)`
                }}>
                    {imagesAndVideos.map((item, index) => {
                        return (
                            <div className='Gallery-grid-img-wrap' key={index}>
                                <img onClick={()=>{setOpenedPhoto({url:item.link, show:true})}} src={item.link} alt="Фотографія" />
                            </div>
                        );
                    })}
                    {videos.map((item, index) => {
                        return (
                            <div className='Gallery-grid-img-wrap' key={index}>
                                <VideoPlayer className="video" src={item.link} />
                            </div>
                        );
                    })}
                </div>
            </>:null}
            {otherFiles.length > 0 ?<>
                <h1>{LANG.documents}</h1>
                <table className='Gallery-documents'>
                    <thead>
                        <tr>
                            <td>Назва</td>
                            <td>Тип</td>
                            <td>Розмір</td>
                            <td>Завантажити</td>
                        </tr>
                    </thead>
                    <tbody>
                        {otherFiles.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{getType(item.type)}</td>
                                    <td>{convertSize(item.size)}</td>
                                    <td><NavLink download={true} to={item.link}><GetAppIcon/></NavLink></td>
                                </tr>
                            );
                        })}

                    </tbody>

                </table>
            </>:null}
            
            {
                openedPhoto.show && <OpenPhoto url={openedPhoto.url} close={()=>{setOpenedPhoto({url:"", show:false})}}/>
            }
            
        </div>
    );
};

export default Gallery;
