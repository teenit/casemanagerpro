import React from "react";
import docxImg from "./../../img/resources/docx.svg";
import mp3Img from "./../../img/resources/mp3.svg";
import pdfImg from "./../../img/resources/pdf.svg";
import pptxImg from "./../../img/resources/pptx.svg";
import xlsxImg from "./../../img/resources/xlsx.svg";
import codeImg from "./../../img/resources/code.svg"
import zipImg from "./../../img/resources/zip.svg"
import mp4Img from "./../../img/resources/mp4.svg"
import pngImg from "./../../img/resources/img.svg"
const ImgFormat = ({img})=>{
    let imgUrl = "";
    switch (img){
        case "png":{
            imgUrl = pngImg;
            break;
        }
        case "docx":{
            imgUrl = docxImg;
            break;
        }
        case "jpeg":{
            imgUrl = pngImg;
            break;
        }
        case "jpg":{
            imgUrl = pngImg;
            break;
        }
        case "mov":{
            imgUrl = mp4Img;
            break;
        }
        case "mp3":{
            imgUrl = mp3Img;
            break;
        }
        case "mp4":{
            imgUrl = mp4Img;
            break;
        }
        case "pdf":{
            imgUrl = pdfImg;
            break;
        }
        case "pptx":{
            imgUrl = pptxImg;
            break;
        }

        case "xlsx":{
            imgUrl = xlsxImg;
            break;
        }
    }
    return (
        <img src={imgUrl} alt={img} title={img} />
    )
}
export default ImgFormat;