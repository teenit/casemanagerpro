import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { getResourcesBD } from "../../services/resources-api";
import s from "./Resources.module.css"
import pngImg from "./../../img/resources/png.png"
import docImg from "./../../img/resources/doc.png"
import docxImg from "./../../img/resources/docx.png"
import jpegImg from "./../../img/resources/jpeg.png"
import jpgImg from "./../../img/resources/jpg.png"
import movImg from "./../../img/resources/mov.png"
import mp3Img from "./../../img/resources/mp3.png"
import mp4Img from "./../../img/resources/mp4.png"
import pdfImg from "./../../img/resources/pdf.png"
import pptImg from "./../../img/resources/ppt.png"
import pptxImg from "./../../img/resources/pptx.png"
import xlsImg from "./../../img/resources/xls.png"
import xlsxImg from "./../../img/resources/xlsx.png"


const GetResources = () => {

    const InfoModal = () => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                setInfo({ ...info, open: false })
            }
        })

        return (
            <div className={s.modal__file}>
                <div className={s.modal__file__black} id="modal__file__black" onClick={(e) => {
                    if (e.target.id == "modal__file__black") setInfo({ ...info, open: false });
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

                            <a target="_blank" href={info.link} className="primary__btn padding20px" download={true}>Завантажити</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function File(elems) {
        return elems.map((elem, ind) => {
            let imgUrl = "";
            switch (elem.format) {
                case "png": {
                    imgUrl = elem.link;
                    break;
                }
                case "doc": {
                    imgUrl = docImg;
                    break;
                }
                case "docx": {
                    imgUrl = docxImg;
                    break;
                }
                case "jpeg": {
                    imgUrl = elem.link;
                    break;
                }
                case "jpg": {
                    imgUrl = elem.link;
                    break;
                }
                case "mov": {
                    imgUrl = movImg;
                    break;
                }
                case "mp3": {
                    imgUrl = mp3Img;
                    break;
                }
                case "mp4": {
                    imgUrl = mp4Img;
                    break;
                }
                case "pdf": {
                    imgUrl = pdfImg;
                    break;
                }
                case "ppt": {
                    imgUrl = pptImg;
                    break;
                }
                case "pptx": {
                    imgUrl = pptxImg;
                    break;
                }
                case "xls": {
                    imgUrl = xlsImg;
                    break;
                }
                case "xlsx": {
                    imgUrl = xlsxImg;
                    break;
                }
            }
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
                    })
                }}>
                    <div className={s.card__row__left}>
                        <img src={imgUrl} alt="" />
                        <p className={s.titleH2}>{elem.title}</p>
                    </div>
                    <p>{elem.size}</p>
                </div>
            )
        })
    }
    const [files, setFiles] = useState([])
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState(false)
    const [formats, setFormats] = useState({
        text: [],
        video: []
    })
    const checkFormat = (formatsMas, type) => {
        const mas = files.filter(item => formatsMas.includes(item.format));
        console.log(mas);
        switch (type) {
            case "text":
                setFormats({ ...formats, text: mas });
                break;
            case "video":
                setFormats({ ...formats, video: mas });
                break;

            default:
                break;
        }
    }
    const cutFileTitle = () => {
        const titleMas = []
        files.map(item => {
            titleMas.push(item.title)
        })
        titleMas.forEach(item => {
            if (item.length > 50) {
                item = item.slice(0, 50) + "..."
            }
        })
    }

    useEffect(() => {
        checkFormat(["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "png", "jpg", "jpeg"], "text")
        checkFormat(["mp4", "mov"], "video")
        getResourcesBD().then((res) => {
            setFiles(res)
            setShow(true)
        });
    }, [])

    return show ? (
        <div className={s.wrap__cards__list}>
            {info.open ? <InfoModal /> : ""}

            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <p>Друкований матеріал</p>
                </div>
                <div className={s.inner__cards}>
                    {File(files)}
                </div>
            </div>
            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <p>Відеоматеріал</p>
                </div>
                <div className={s.inner__cards}>
                    {File(formats.video)}
                </div>
            </div>

        </div>
    ) : (
        <>555</>
    )
}

export default GetResources;