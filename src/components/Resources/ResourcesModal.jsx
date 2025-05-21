import { Component } from "react";
import { Button} from "@mui/material";
import AccessCheck from "../Functions/AccessCheck";
import { LANG } from "../../services/config";

class ResourcesModal extends Component {
    constructor(props) {
        super(props);
    }
    convertSize = (size) => {
        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    };
    canDownload = ()=>{
        return AccessCheck("yes_no", "a_page_resources_download")
    }
    getLink = (type)=>{
        if(type !== "image" && type !=="video"){
            return this.props.info.img
        }
        return this.props.info.link
    }
    render() {
        const info = this.props.info;
        return (
            <div className="ResourcesModal" onClick={this.props.close}>
                    <div className="ResourcesModal-inner" onClick={(e)=>{e.stopPropagation()}}>
                            <img src={this.getLink(info.type)} alt={info.title} className="ResourcesModal-img"/>
                        <div className="ResourcesModal-info">
                            <span>
                                <div className="ResourcesModal-title">{info?.title ? LANG.resources.title:LANG.resources.no_title}</div>
                                <div>{info?.title}</div>
                            </span>
                            {/* <span>
                                <div className="ResourcesModal-title">Дата:</div>
                                <div>{info?.date}</div>
                            </span> */}
                            <span>
                                <div className="ResourcesModal-title">{LANG.resources.size}</div>
                                <div>{this.convertSize(info?.size)}</div>
                            </span>
                           {info?.description && <span>
                                <div className="ResourcesModal-title">{LANG.resources.desc}</div>
                                <div>{info.description}</div>
                            </span>}
                            {this.canDownload && (
                                <Button variant="contained">
                                    <a target="_blank" href={info?.link} download={true} rel="noreferrer">
                                        {LANG.GLOBAL.download}
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
        );
    }
}

export default ResourcesModal;
