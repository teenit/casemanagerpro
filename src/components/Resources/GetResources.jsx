import React, { useState, useEffect } from "react";
import { getResourcesBD } from "../../services/resources-api";
import s from "./Resources.module.css";
import pngImg from "./../../img/resources/png.png";
import docImg from "./../../img/resources/doc.png";
import docxImg from "./../../img/resources/docx.png";
import jpegImg from "./../../img/resources/jpeg.png";
import jpgImg from "./../../img/resources/jpg.png";
import movImg from "./../../img/resources/mov.png";
import mp3Img from "./../../img/resources/mp3.png";
import mp4Img from "./../../img/resources/mp4.png";
import pdfImg from "./../../img/resources/pdf.png";
import pptImg from "./../../img/resources/ppt.png";
import pptxImg from "./../../img/resources/pptx.png";
import xlsImg from "./../../img/resources/xls.png";
import xlsxImg from "./../../img/resources/xlsx.png";
import { Button } from "@mui/material";
import { apiResponse } from "../Functions/get_apiObj";
import GetDocumentBlock from "./GetDocumentBlock";
import GetLinksBlock from "./GetLinksBlock";
import Icon from "../elements/Icons/Icon";

const GetResources = ({ docFiles, mediaFiles, links, show, loadGroups, confirmDelete }) => {
    const [info, setInfo] = useState({});
    const [showList, setShowList] = useState({
        docs: false,
        media: false
    });

    const showHandler = (key) => {
        setShowList({ ...showList, [key]: !showList[key] });
    };

    const InfoModal = () => {
        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setInfo({ ...info, open: false });
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [info]);

        return (
            <div className={s.modal__file}>
                <div
                    className={s.modal__file__black}
                    id="modal__file__black"
                    onClick={(e) => {
                        if (e.target.id === "modal__file__black") setInfo({ ...info, open: false });
                    }}
                >
                    <div className={s.modal__file__inner}>
                        <div className={s.modal__file__img}>
                            <img src={info.img} alt="" />
                        </div>
                        <div className={s.modal__file__info}>
                            <span>
                                <p className={s.modal__file__title}>Назва:</p>
                                <p>{info.title}</p>
                            </span>
                            <span>
                                <p className={s.modal__file__title}>Дата:</p>
                                <p>{info.date}</p>
                            </span>
                            <span>
                                <p className={s.modal__file__title}>Розмір:</p>
                                <p>{info.size}</p>
                            </span>
                            <span>
                                <p className={s.modal__file__title}>Опис файлу:</p>
                                <p>{info.description}</p>
                            </span>

                            <Button variant="contained">
                                <a target="_blank" href={info.link} download={true}>Завантажити</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const cutTitle = (title) => {
        return title.length > 40 ? title.substring(0, 40) + "..." : title;
    };

    const getImageByType = (type) => {
        switch (type) {
            case "application/msword":
                return docImg;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return docxImg;
            case "audio/mpeg":
                return mp3Img;
            case "application/pdf":
                return pdfImg;
            case "application/vnd.ms-powerpoint":
                return pptImg;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return pptxImg;
            case "application/vnd.ms-excel":
                return xlsImg;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return xlsxImg;
            default:
                return "";
        }
    };

    const getPreview = (file) => {
        const type = file.type.split('/')[0]
        if (type == 'image') {
            return file.link
        } else if (type == 'video') {
            return `${file.link}#t=0.5`
        } else {
            return getImageByType(file.type)
        }
    };

    const File = (elems) => elems.map((elem, ind) => {
        function convertSize(size) {
            if (size < 1024 * 1024) {
                let sizeInKB = size / 1024
                return sizeInKB.toFixed(2) + " KB"
            } else {
                let sizeInMB = size / (1024 * 1024)
                return sizeInMB.toFixed(2) + " MB"
            }
        }
        const previewUrl = getPreview(elem)
        const open = ()=>{
            setInfo({
                open: true,
                title: elem.title,
                description: elem.description,
                size: elem.size,
                link: elem.link,
                date: elem.date,
                img: previewUrl
            });
        }
        return (
            <div className={s.file__card} key={ind}>
                <img src={previewUrl} alt="" onClick={open}/>
                <p className={s.titleH2} onClick={open}>{cutTitle(elem.title)}</p>
                <p>{convertSize(elem.size)}</p>
                <span onClick={() => { confirmDelete(elem) }}>
                    <Icon icon={"delete"} addClass={"close-icon fs16"} />
                </span>
            </div>
        );
    });

    useEffect(() => {
        loadGroups();
    }, []);

    return show && (
        <div className={s.wrap__cards__list}>
            {info.open ? <InfoModal /> : ""}
            <GetLinksBlock confirmDelete={confirmDelete} links={links} />
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => { showHandler("docs") }}>
                        <p>Документи</p>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.docs && File(docFiles)}
                </div>
            </div>
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => { showHandler("media") }}>
                        <p>Фото та Відео</p>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.media && File(mediaFiles)}
                </div>
            </div>
        </div>
    );
};

export default GetResources;
