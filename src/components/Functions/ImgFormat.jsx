import React from "react";
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
const ImgFormat = ({img})=>{
    let imgUrl = "";
    switch (img){
        case "png":{
            imgUrl = pngImg;
            break;
        }
        case "doc":{
            imgUrl = docImg;
            break;
        }
        case "docx":{
            imgUrl = docxImg;
            break;
        }
        case "jpeg":{
            imgUrl = jpegImg;
            break;
        }
        case "jpg":{
            imgUrl = jpgImg;
            break;
        }
        case "mov":{
            imgUrl = movImg;
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
        case "ppt":{
            imgUrl = pptImg;
            break;
        }
        case "pptx":{
            imgUrl = pptxImg;
            break;
        }
        case "xls":{
            imgUrl = xlsImg;
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