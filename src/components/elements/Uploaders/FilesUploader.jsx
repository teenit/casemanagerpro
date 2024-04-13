import React, { useState } from 'react';
import axios from 'axios';
import { serverAddres } from '../../Functions/serverAddres';

function FilesUploader({multiple = true, successHandler = ()=>{}, meta = null}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
      const images = [];
      filesArray.forEach(file => {
        if (file.type.startsWith('image/')) {
          images.push(URL.createObjectURL(file));
        } else {
          images.push(null); // null for non-image files
        }
      });
      setPreviewImages(images);
    }
  };

  const handleUpload = async () => {
    console.log(meta)
    if (!meta) return console.log("meta object is require");
    setUploading(true);
    const formData = new FormData();   
    for(let i=0; i<selectedFiles.length; i++){
      formData.append(`files[${i}]`, selectedFiles[i])
    }

    const metaObject = {...meta};
    formData.append('meta', JSON.stringify(metaObject));

    axios({
      url: serverAddres("upload-files.php"),
      method: "POST",
      headers: {'Content-Type': 'multipart/form-data'}, // Змінено header на headers
      data: formData,
      onUploadProgress: event => {
        console.log("text")
        console.log(Math.round(event.loaded * 100 / event.total))
      }
    })
    .then((response) => {
      console.log(response.data)
      successHandler(response.data)
    })
    .catch((error) => console.log(error))    
  
  };

  return (
    <div className='FilesUploader'>
      <input type="file" multiple={multiple} onChange={handleFileChange} />
      <div>
        {previewImages.map((preview, index) => (
          <div key={index}>
            {preview ? (
              <img src={preview} alt={`Preview ${index}`} />
            ) : (
              <span>{selectedFiles[index].name}</span>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default FilesUploader;
