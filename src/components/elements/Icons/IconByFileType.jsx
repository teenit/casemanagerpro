import { Component } from "react";
import docxImg from "./../../../img/resources/docx.svg";
import mp3Img from "./../../../img/resources/mp3.svg";
import pdfImg from "./../../../img/resources/pdf.svg";
import pptxImg from "./../../../img/resources/pptx.svg";
import xlsxImg from "./../../../img/resources/xlsx.svg";
import codeImg from "./../../../img/resources/code.svg"
import zipImg from "./../../../img/resources/zip.svg"
import mp4Img from "./../../../img/resources/mp4.svg"
import pngImg from "./../../../img/resources/img.svg"
class IconByFileType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "jpg": pngImg,
            "jpeg": pngImg,
            "png": pngImg,
            "gif": pngImg,
            "bmp": pngImg,
            "svg": pngImg,
            "webp": pngImg,
            "tiff": pngImg,
            "heic": pngImg,
            "mp4": "",
            "avi": "",
            "mov": "",
            "mkv": "",
            "wmv": "",
            "flv": "",
            "webm": "",
            "pdf": pdfImg,
            "doc": docxImg,
            "docx": docxImg,
            "xls": xlsxImg,
            "xlsx": xlsxImg,
            "ppt": pptxImg,
            "pptx": pptxImg,
            "txt": codeImg,
            "rtf": codeImg,
            "odt": codeImg,
            "ods": codeImg,
            "odp": codeImg,
            "csv": codeImg,
            "mp3": mp3Img,
            "wav": mp3Img,
            "aac": mp3Img,
            "ogg": mp3Img,
            "flac": mp3Img,
            "m4a": mp3Img,
            "wma": mp3Img,
            "zip": zipImg,
            "rar": zipImg,
            "7z": zipImg,
            "tar": zipImg,
            "gz": zipImg,
        }
    }
    render() {
        return <img src={this.state[this.props.extension]} alt={this.props.extension} />
    }
}
export default IconByFileType