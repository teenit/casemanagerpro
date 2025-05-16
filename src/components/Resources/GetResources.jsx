import React, { useState, useEffect } from "react";
import s from "./Resources.module.css";
import docxImg from "./../../img/resources/docx.svg";
import mp3Img from "./../../img/resources/mp3.svg";
import pdfImg from "./../../img/resources/pdf.svg";
import pptxImg from "./../../img/resources/pptx.svg";
import xlsxImg from "./../../img/resources/xlsx.svg";
import codeImg from "./../../img/resources/code.svg"
import zipImg from "./../../img/resources/zip.svg"
import mp4Img from "./../../img/resources/mp4.svg"
import { Button } from "@mui/material";
import GetLinksBlock from "./GetLinksBlock";
import Icon from "../elements/Icons/Icon";
import AccessCheck from "../Functions/AccessCheck";
import EmptyData from "../EmptyData/EmptyData"
import { LANG } from "../../services/config";
const GetResources = ({ docFiles, mediaFiles, links, show, loadGroups, confirmDelete, showForm }) => {
    const [info, setInfo] = useState({});
    const [showList, setShowList] = useState({
        docs: false,
        media: false
    });
    const canDelete = AccessCheck('yes_no', 'a_page_resources_remove')
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
                            <img src={info.img} alt="Файл" />
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
                            {AccessCheck('yes_no', 'a_page_resources_download') && <Button variant="contained">
                                <a target="_blank" href={info.link} download={true}>Завантажити</a>
                            </Button>}

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const cutTitle = (title) => {
        return title.length < 1 ? "Файл без назви" : (title.length > 40 ? title.substring(0, 40) + "..." : title)
    };

    const getImageByType = (type) => {
        switch (type) {
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return docxImg;
            case "application/pdf":
                return pdfImg;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return pptxImg;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return xlsxImg;

            case "audio/mpeg":
                return mp3Img;

            case "video/mp4", "video/x-msvideo", "video/quicktime", "video/x-matroska":
                return mp4Img;

            case "application/zip", "application/x-rar-compressed", "application/x-7z-compressed":
                return zipImg;

            case "text/html", "text/css", "application/javascript", "application/json", "application/x-python-code", "application/x-java":
                return codeImg;
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
        const open = () => {
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
                <img src={previewUrl} alt="Файл" onClick={open} />
                <p className={s.titleH2} onClick={open}>{cutTitle(elem.title)}</p>
                <p>{convertSize(elem.size)}</p>
                {canDelete && <Icon icon={"delete"} addClass={"close-icon fs16"} onClick={() => { confirmDelete(elem) }} />}

            </div>
        );
    });

    useEffect(() => {
        loadGroups();
    }, []);

    return show && (
        <div className={s.wrap__cards__list}>
            {info.open ? <InfoModal /> : ""}
            <GetLinksBlock confirmDelete={confirmDelete} links={links} showForm={() => { showForm("link") }} />
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => { showHandler("docs") }}>
                        <span>{LANG.resources.documents}</span>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.docs && (docFiles.length > 0 ? File(docFiles) : <EmptyData icon={"no_results"}
                        title={LANG.resources.no_files} buttonText={LANG.resources.add_first_file}
                        click={() => { showForm("files") }} />)}
                </div>
            </div>
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => { showHandler("media") }}>
                        <span>{LANG.resources.media}</span>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.media && (mediaFiles.length > 0 ? File(mediaFiles) : <EmptyData icon={"no_results"}
                        title={LANG.resources.no_files} buttonText={LANG.resources.add_first_file}
                        click={() => { showForm("files") }} />)}
                </div>
            </div>
        </div>
    );
};

export default GetResources;
