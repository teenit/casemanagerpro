import React from "react";
import { Button } from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import { LANG } from "../../services/config";

const ResourcesModal = ({ info, close }) => {
    const convertSize = (size) => {
        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    };

    const canDownload = () => AccessCheck("yes_no", "a_page_resources_download");

    const getLink = (type) => {
        if (type !== "image" && type !== "video") {
            return info.img;
        }
        return info.link;
    };

    return (
        <div className="ResourcesModal" onClick={close}>
            <div className="ResourcesModal-inner" onClick={(e) => e.stopPropagation()}>
                <img src={getLink(info.type)} alt={info.title} className="ResourcesModal-img" />
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
                            <div>{info.description}</div>
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
