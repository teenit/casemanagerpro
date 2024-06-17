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

const GetResources = ({docFiles, mediaFiles, show, loadGroups, files}) => {
    const [info, setInfo] = useState({});

    const InfoModal = () => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setInfo({ ...info, open: false });
            }
        });

        return (
            <div className={s.modal__file}>
                <div className={s.modal__file__black} id="modal__file__black" onClick={(e) => {
                    if (e.target.id === "modal__file__black") setInfo({ ...info, open: false });
                }}>
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
        )
    }

    const cutTitle = (title) => {
        return title.length > 40 ? title.substring(0, 40) + "..." : title;
    }

    const getImageByType = (type) => {
        switch (type) {
            case "image/png":
                return pngImg;
            case "image/jpeg":
            case "image/jpg":
                return jpegImg;
            case "application/msword":
                return docImg;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return docxImg;
            case "video/quicktime":
                return movImg;
            case "audio/mpeg":
                return mp3Img;
            case "video/mp4":
                return mp4Img;
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
    }

    const File = (elems) => elems.map((elem, ind) => {
        const imgUrl = getImageByType(elem.type);

        return (
            <div className={s.file__card} key={ind} onClick={() => {
                setInfo({
                    open: true,
                    title: elem.title,
                    description: elem.description,
                    size: elem.size,
                    link: elem.link,
                    date: elem.date,
                    img: imgUrl
                });
            }}>
                <div className={s.card__row__left}>
                    <img src={imgUrl} alt="" />
                    <p className={s.titleH2}>{cutTitle(elem.title)}</p>
                </div>
                <p>{elem.size}</p>
            </div>
        );
    });

    useEffect(() => {
        loadGroups()
    }, []);


    return show && (
        <div className={s.wrap__cards__list}>
            {info.open ? <InfoModal /> : ""}
            <GetDocumentBlock resources = {docFiles} />
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <p>Документи</p>
                </div>
                <div className={s.inner__cards}>
                    {File(docFiles)}
                </div>
            </div>
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <p>Фото та Відео</p>
                </div>
                <div className={s.inner__cards}>
                    {File(mediaFiles)}
                </div>
            </div>
        </div>
    )
}

export default GetResources;
