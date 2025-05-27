import React, { useState, useEffect } from "react";
import s from "./Resources.module.css";
import docxImg from "./../../img/resources/docx.svg";
import mp3Img from "./../../img/resources/mp3.svg";
import pdfImg from "./../../img/resources/pdf.svg";
import pptxImg from "./../../img/resources/pptx.svg";
import xlsxImg from "./../../img/resources/xlsx.svg";
import codeImg from "./../../img/resources/code.svg";
import zipImg from "./../../img/resources/zip.svg";
import GetLinksBlock from "./GetLinksBlock";
import Icon from "../elements/Icons/Icon";
import AccessCheck from "../Functions/AccessCheck";
import EmptyData from "../EmptyData/EmptyData";
import { LANG } from "../../services/config";
import ResourcesModal from "./ResourcesModal";

const GetResources = ({ docFiles, mediaFiles, links, show, loadGroups, confirmDelete, showForm }) => {
    const [modal, setModal] = useState({
        active: false,
        info: {}
    });

    const [showList, setShowList] = useState({
        docs: false,
        media: false
    });

    const canDelete = AccessCheck("yes_no", "a_page_resources_remove");

    const showHandler = (key) => {
        setShowList({ ...showList, [key]: !showList[key] });
    };

    const cutTitle = (title) => {
        return title.length < 1 ? LANG.resources.no_title : (title.length > 40 ? title.substring(0, 40) + "..." : title);
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
            case "application/zip":
            case "application/x-rar-compressed":
            case "application/x-7z-compressed":
                return zipImg;
            case "text/html":
            case "text/css":
            case "application/javascript":
            case "application/json":
            case "application/x-python-code":
            case "application/x-java":
                return codeImg;
            default:
                return "";
        }
    };

    const getPreview = (file) => {
        const type = file.type.split("/")[0]
        if (type === "image") {
            return file.link
        } else if (type === "video") {
            return `${file.link}#t=0.5`
        } else {
            return getImageByType(file.type)
        }
    };

    const convertSize = (size) => {
        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    };

    const File = ({ item }) => {
        const previewUrl = getPreview(item);
        const open = () => {
            setModal({
                active: true,
                info: {...item, img:previewUrl},
            });
        };

        return (
            <div className={s.file__card}>
                <img src={previewUrl} alt={item.title} onClick={open} />
                <p className={s.titleH2} onClick={open}>{cutTitle(item.title)}</p>
                <p>{convertSize(item.size)}</p>
                {canDelete && (
                    <Icon icon={"delete"} addClass={"close-icon fs16"} onClick={() => confirmDelete(item)} />
                )}
            </div>
        );
    };

    useEffect(() => {
        loadGroups();
    }, []);

    return show && (
        <div className={s.wrap__cards__list}>
            {modal.active && <ResourcesModal info={modal.info} close={() => setModal({ ...modal, active: false })} />}
            <GetLinksBlock confirmDelete={confirmDelete} links={links} showForm={() => showForm("link")} />

            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => showHandler("docs")}>
                        <span>{LANG.resources.documents}</span>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.docs && (
                        docFiles.length > 0 ? (
                            docFiles.map((item, index) => (
                                <File key={index} item={item} />
                            ))
                        ) : (
                            <EmptyData
                                icon={"no_results"}
                                title={LANG.resources.no_files}
                                buttonText={LANG.resources.add_first_file}
                                click={() => showForm("files")}
                            />
                        )
                    )}
                </div>
            </div>

            <div className={s.wrap__cards}>
                <div className={s.cards__header}>
                    <div className={s.cards__title} onClick={() => showHandler("media")}>
                        <span>{LANG.resources.media}</span>
                        <Icon icon={"arrow_down"} />
                    </div>
                </div>
                <div className={s.inner__cards}>
                    {showList.media && (
                        mediaFiles.length > 0 ? (
                            mediaFiles.map((item, index) => (
                                <File key={index} item={item} />
                            ))
                        ) : (
                            <EmptyData
                                icon={"no_results"}
                                title={LANG.resources.no_files}
                                buttonText={LANG.resources.add_first_file}
                                click={() => showForm("files")}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetResources;
