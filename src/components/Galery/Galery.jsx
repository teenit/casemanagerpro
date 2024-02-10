import React from "react";
import s from "./galery.module.css"
import VideoPlayer from "react-video-js-player";
import { useState } from "react";
import SliderBigger from "./SliderBigger";

const Galery = ({media,title})=>{
const [slider, setSlider] = useState({
    show:false,
    media:media,
    ind:0
})
    return(
        <div className={s.galery__wrap}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.galery__inner}>
                {media.map((item,index)=>{
                    if(item.format.toLowerCase() == "png" || item.format.toLowerCase() == "jpeg" || item.format.toLowerCase() == "jpg" || item.format.toLowerCase() == "ico"){
                        return(
                            <div key={item.link + index}><img className={s.photo} title={item.title} src={item.link} alt="" onClick={()=>{
                                setSlider({...slider,ind:index,show:true})
                            }}/></div>
                        )
                    }else if(item.format.toLowerCase() == "avi" || item.format.toLowerCase() == "mp4" || item.format.toLowerCase() == "mkv" || item.format.toLowerCase() == "mov"){
                        return(
                            <div key={item.link + index} >
                                <VideoPlayer className={s.video} src={item.link} />
                            </div> 
                        )
                    }    
                })}
            </div>
            {slider.show ? <SliderBigger close = {()=>{setSlider({...slider,show:false})}} media={media} ind = {slider.ind}/>:null}
        </div>
    )
}

export default Galery;