import React, { useState } from "react";
import s from "./slider-big.module.css"
import VideoPlayer from "react-video-js-player";
import arrow from "./../../img/icons/arrow-left-white-100.png"

const SliderBigger = ({media, ind,close})=>{
    const MediaBlock = ({item})=>{
        return(
           <div className={s.media__block}>
                {item.format.toLowerCase() == "png" || item.format.toLowerCase() == "jpeg" || item.format.toLowerCase() == "jpg" || item.format.toLowerCase() == "ico"? <img className={s.photo} src={item.link} alt=""/>:<VideoPlayer className={s.video} src={item.link} />}
           </div> 
        )
    }
    const [slider,setSlider] = useState({
        slideNow:ind,
        media:media
    })
    return(
        <div className={s.slider}>
            <div className={s.close} onClick={close}>
                <span className={s.close__one}></span>
                <span className={s.close__two}></span>
            </div>
            <div className={`${s.arrow} ${s.left__arrow}`} onClick={()=>{
                if(slider.slideNow == 0) return
                setSlider({...slider,slideNow:slider.slideNow - 1})
            }}>
                <img src={arrow} alt="" />
            </div>
            <div className={s.inner}>
                    <MediaBlock item = {slider.media[slider.slideNow]}/>
            </div>
            <div className={`${s.arrow} ${s.right__arrow}`} onClick={()=>{
                 if(slider.slideNow == slider.media.length - 1) return
                setSlider({...slider,slideNow:slider.slideNow + 1})
            }}>
                <img src={arrow} alt="" />
            </div>
        </div>
    )
}

export default SliderBigger;