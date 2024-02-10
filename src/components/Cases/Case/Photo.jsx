import React from "react"
import VideoPlayer from "react-video-js-player";
const Photo = ({photos}) =>{
    console.log(photos)
    function ext(name) {
        return name.match(/\.([^.]+)$|$/)[1];
      }
    const PhotosData = ({pic})=>{
        return (
                <img src={pic.url} />
        )
    }
    const DocsData = ({pic})=>{
        return (
                <a target="_blank" href={pic.url}>{pic.title}</a>
        )
    }
    const VideoData = ({pic})=>{
        return (
                <VideoPlayer src={pic.url}/>
        )
    }
    let casePost = "";
    const PhotosMap = (pos)=>{
        if(pos.length < 1) return;
           casePost =  pos.map((pic,index)=>{
                let rozsh = ext(pic.url);
                rozsh = rozsh.toLowerCase()
                if(rozsh == "mp4" || rozsh == "mkv" || rozsh == "avi" || rozsh == "mov"){
                    return(
                        <VideoData key={index} pic = {pic} />
                    )
                }else if(rozsh == "jpg" || rozsh == "png" || rozsh == "jpeg"){
                    return(
                        <PhotosData key={index} pic={pic}/>
                    )
                }else{
                    return(
                        <DocsData key={index} pic={pic}/>
                    )
                }
               
                
            

        })  
    }
    return photos.length > 0 ?(
        <>
            {
               PhotosMap(photos)
            }
            {
                casePost
            }
        </>
        
    ):(
        <>
            <h1>Немає завантажених фото</h1>
            {console.log(photos)}
        </>
    )
}
export default Photo;