import React, { useEffect, useState } from 'react'
import { apiResponse } from '../Functions/get_apiObj'
import { useParams } from 'react-router-dom';


const File = ({files}) => {
    const [data,setData] = useState(null)
    let params = useParams();
    const file_id = params.id;
    useEffect(()=>{
        apiResponse({file_id:file_id}, "manage/files/get-by-id.php").then((res)=>{
          setData(res.data)
        })
    },[file_id])
  return (
    <div>File {file_id}</div>
  )
}

export default File