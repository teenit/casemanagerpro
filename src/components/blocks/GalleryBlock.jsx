import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GetAppIcon from '@mui/icons-material/GetApp';
import VideoPlayer from "react-video-js-player";
import OpenPhoto from '../Galery/OpenPhoto';
import { LANG } from '../../services/config';
import Icon from '../elements/Icons/Icon';
import Table from '../elements/Table/Table';
import ActionMenu from '../Portals/ActionMenu';
import ModalConfirm from '../Modals/ModalConfirm';
import { apiResponse } from '../Functions/get_apiObj';
import { Button } from '@mui/material';

const GalleryBlock = ({ data, check, deleteMedia = () => {} }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [imgRows, setImgRows] = useState(0);
    const [imgColumns, setImgColumns] = useState(3)
    const [imagesAndVideos, setImagesAndVideos] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);
    const [openedPhoto, setOpenedPhoto] = useState({ url: "", show: false });
    const [confirmDelete, setConfirmDelete] = useState({
        current_file: null,
        active: false
    })
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const sortFiles = (data) => {

        let obj = {
            docs: [],
            media: []
        };
        data?.forEach(item => {
            if (item?.mime_type?.startsWith("application/")) {
                obj.docs.push(item);
            } else {
                obj.media.push(item);
            }
        });
        return obj;
    };

    const handleRowsChange = (value) => {
        setImgRows(value);
    };

    const loadData = () => {
    let columns = 3;
        if (width < 720 && width > 520) {
            columns = 2;
        } else if (width < 520) {
            columns = 1;
        }
        setImgColumns(columns);
        let rows = Math.ceil(sortFiles(data).media.length / columns);
        handleRowsChange(rows);
        let sortedFiles = sortFiles(data);
        setImagesAndVideos([...sortedFiles.media]);
        setOtherFiles([...sortedFiles.docs]);
    }

    useEffect(() => {
       loadData();
    }, [data, width]);

    const getType = (str) => {
        if (!str) return '';
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
    const confirmDeleteHandler = (file = null) => {
        setConfirmDelete({ ...confirmDelete, active: !confirmDelete.active, current_file: file })
    }
    const deleteHandler = () => {
        deleteMedia(confirmDelete.current_file);
    }
    const columnsTable = [
        {
            dataField: 'title',
            text: LANG.galleryBlock.name,
            fixed: false,
            isHidden: false,
            sort: false,
            formatter: (cell, row) => {
                return <div>{cell}</div>
            }
        },
        {
            dataField: 'mime_type',
            text: LANG.galleryBlock.type,
            fixed: false,
            isHidden: false,
            sort: false,
            formatter: (cell, row) => {
                return <div>{getType(row?.mime_type)}</div>
            }
        },
        {
            dataField: 'size',
            text: LANG.galleryBlock.size,
            fixed: false,
            isHidden: false,
            sort: false,
            formatter: (cell, row) => {
                return <div>{convertSize(row.file_size)}</div>
            }
        },
        {
            dataField: 'download',
            text: LANG.galleryBlock.download,
            fixed: false,
            isHidden: false,
            sort: false,
            formatter: (cell, row) => {
                return check && <a download={row.name} href={row.link}>
                    <Icon icon={"download"} addClass={"default-icon"} />
                </a>
            }
        },
        {
            dataField: "menu_row",
            text: "",
            fixed: false,
            formatter: (cell, row) => {
                const menuItems = [
                    {
                        title: LANG.GLOBAL.delete,
                        isHidden: false,
                        icon: "delete",
                        color: 'error',
                        click: () => {
                            confirmDeleteHandler(row)
                        }
                    }
                ]
                return <ActionMenu menuItems={menuItems}/>
            }
        }
    ];

    return (
        <div className='GalleryBlock'>
            {imagesAndVideos.length > 0 && <>
                <div className='GalleryBlock-title'>{LANG.gallery}</div>
                <div className='GalleryBlock-grid' style={{
                    gridTemplateRows: `repeat(${imgRows}, 1fr)`,
                    gridTemplateColumns: `repeat(${imgColumns}, 1fr)`,
                }}>
                    {imagesAndVideos.map((item, index) => {
                        const menuItems = [
                            {
                                title: LANG.GLOBAL.delete,
                                isHidden: false,
                                icon: "delete",
                                color: 'error',
                                click: () => {
                                    confirmDeleteHandler(item)
                                }
                            }
                        ]
                        if (item?.mime_type?.startsWith("video/")) {
                            return (
                                <div className='GalleryBlock-grid-img-wrap' key={index}>
                                    <VideoPlayer className="video" src={item.link} />
                                    <div style={{height:"max-content"}}><ActionMenu menuItems={menuItems} /></div>
                                </div>
                            );
                        } else {
                            return (
                                <div className='GalleryBlock-grid-img-wrap' key={index}>
                                    <img onClick={() => { setOpenedPhoto({ url: item.link, show: true }) }} src={item.link} alt={LANG.case_files.photo} />
                                    <div style={{height:"max-content"}}><ActionMenu menuItems={menuItems} /></div>
                                </div>
                            );
                        }
                    })}
                </div>
            </>}
            {otherFiles.length > 0 && <>
                <div className='GalleryBlock-title'>{LANG.documents}</div>
                <Table columns={columnsTable} data={otherFiles} />
            </>}
            {confirmDelete.active && <ModalConfirm text={LANG.case_files.delete_confirm}
                closeHandler={() => { confirmDeleteHandler() }} successHandler={deleteHandler} />}
            {
                openedPhoto.show && <OpenPhoto url={openedPhoto.url} close={() => { setOpenedPhoto({ url: "", show: false }) }} />
            }
        </div>
    );
};

export default GalleryBlock;
