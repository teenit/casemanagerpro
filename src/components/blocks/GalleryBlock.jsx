import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GetAppIcon from '@mui/icons-material/GetApp';
import VideoPlayer from "react-video-js-player";
import OpenPhoto from '../Galery/OpenPhoto';
import { LANG } from '../../services/config';

const GalleryBlock = ({ data }) => {
    const [imgRows, setImgRows] = useState(0);
    const [imagesAndVideos, setImagesAndVideos] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);
    const [openedPhoto, setOpenedPhoto] = useState({ url: "", show: false });
    function sortFiles(data) {
        let obj = {
            docs: [],
            media: []
        };
        data.forEach(item => {
            if (item.type.startsWith("application/")) {
                obj.docs.push(item);
            } else {
                obj.media.push(item);
            }
        });
        return obj;
    }

    const handleRowsChange = (value) => {
        setImgRows(value);
    };

    useEffect(() => {
        let rows = Math.ceil(data.length / 3);
        handleRowsChange(rows);
        let sortedFiles = sortFiles(data);
        setImagesAndVideos([...sortedFiles.media]);
        setOtherFiles([...sortedFiles.docs]);
    }, [data]);

    const getType = (str) => {
        let slashIndex = str.indexOf("/");
        return str.slice(0, slashIndex);
    };

    function convertSize(size) {
        if (size < 1024 * 1024) {
            let sizeInKB = size / 1024;
            return sizeInKB.toFixed(2) + " KB";
        } else {
            let sizeInMB = size / (1024 * 1024);
            return sizeInMB.toFixed(2) + " MB";
        }
    }

    return (
        <div className='Gallery'>
            {imagesAndVideos.length>0 && <>
                <h1>{LANG.gallery}</h1>
                <div className='Gallery-grid' style={{
                    gridTemplateRows: `repeat(${imgRows},1fr)`
                }}>
                    {imagesAndVideos.map((item, index) => {
                        if (item.type.startsWith("video/")) {
                            return (
                                <div className='Gallery-grid-img-wrap' key={index}>
                                    <VideoPlayer className="video" src={item.link} />
                                </div>
                            );
                        } else {
                            return (
                                <div className='Gallery-grid-img-wrap' key={index}>
                                    <img onClick={() => { setOpenedPhoto({ url: item.link, show: true }) }} src={item.link} alt="Фотографія" />
                                </div>
                            );
                        }
                    })}
                </div>
            </>}
            {otherFiles.length>0 && <>
                <h1>{LANG.documents}</h1>
                <table className='Gallery-documents'>
                    <thead>
                        <tr>
                            <td>{LANG.galleryBlock.name}</td>
                            <td>{LANG.galleryBlock.name}</td>
                            <td>{LANG.galleryBlock.size}</td>
                            <td>{LANG.galleryBlock.download}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {otherFiles.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{getType(item.type)}</td>
                                    <td>{convertSize(item.size)}</td>
                                    <td><NavLink download={true} to={item.link}><GetAppIcon /></NavLink></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>}
            {
                openedPhoto.show && <OpenPhoto url={openedPhoto.url} close={() => { setOpenedPhoto({ url: "", show: false }) }} />
            }
        </div>
    );
};

export default GalleryBlock;