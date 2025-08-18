import React from "react";
import { Button } from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import { LANG } from "../../services/config";
import TextDescription from "../elements/TextFormatters/TextDescription";
import docxImg from "./../../img/resources/docx.svg";
import mp3Img from "./../../img/resources/mp3.svg";
import pdfImg from "./../../img/resources/pdf.svg";
import pptxImg from "./../../img/resources/pptx.svg";
import xlsxImg from "./../../img/resources/xlsx.svg";
import codeImg from "./../../img/resources/code.svg";
import zipImg from "./../../img/resources/zip.svg";
const ResourcesModal = ({ info, close }) => {
    const convertSize = (size) => {
        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    };

    const canDownload = () => AccessCheck("yes_no", "a_page_resources_download");

    const getImage = (type) => {
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
                return info.link;
        }
    };

    return (
        <div className="ResourcesModal" onClick={close}>
            <div className="ResourcesModal-inner" onClick={(e) => e.stopPropagation()}>
                <img src={getImage(info.type)} alt={info.title} className="ResourcesModal-img" />
                <div className="ResourcesModal-info">
                    <span>
                        <div className="ResourcesModal-title">
                            {info?.title ? LANG.resources.title : LANG.resources.no_title}
                        </div>
                        <div>{info?.title}</div>
                    </span>
                    <span>
                        <div className="ResourcesModal-title">{LANG.resources.size}</div>
                        <div>{convertSize(info?.size)}</div>
                    </span>
                    {info?.description && (
                        <span>
                            <div className="ResourcesModal-title">{LANG.resources.desc}</div>
                            <TextDescription text={info.description} />
                        </span>
                    )}
                    {canDownload() && (
                        <Button variant="contained">
                            <a target="_blank" href={info?.link} download rel="noreferrer">
                                {LANG.GLOBAL.download}
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourcesModal;
