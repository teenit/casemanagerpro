import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '';
const API_KEY = '';
const SCOPES = '';
const REDIRECT_URI = '';

function GoogleDriveFileManager() {
  const [files, setFiles] = useState([]);
  const [sharedDrives, setSharedDrives] = useState([]);
  const [currentDriveId, setCurrentDriveId] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState('root'); // Початково 'root', щоб показувати корінь диска

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      loadSharedDrives();
    }
  };

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn({
      redirect_uri: REDIRECT_URI,
    });
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const loadSharedDrives = () => {
    gapi.client.drive.drives.list({
      pageSize: 10,
      fields: "nextPageToken, drives(id, name)",
    }).then(response => {
      setSharedDrives(response.result.drives);
    });
  };

  const loadFiles = (driveId, folderId = 'root', pageToken = '') => {
    const query = `'${folderId}' in parents`; // Фільтруємо файли по конкретній папці

    gapi.client.drive.files.list({
      driveId: driveId,
      corpora: 'drive',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      q: query,
      fields: "nextPageToken, files(id, name, mimeType, parents, thumbnailLink)",
      pageToken: pageToken,
    }).then(response => {
      setFiles(prevFiles => [...prevFiles, ...response.result.files]);  // Додаємо нові файли до старих
      if (response.result.nextPageToken) {
        loadFiles(driveId, folderId, response.result.nextPageToken);
      }
    }).catch(error => {
      console.error("Error loading files: ", error);
    });
  };

  const handleDriveClick = (driveId) => {
    setCurrentDriveId(driveId);
    setFiles([]);  // Очищаємо файли перед завантаженням нових
    loadFiles(driveId, driveId);  // Завантажуємо файли для цього спільного диска
  };

  const handleFolderClick = (folderId) => {
    setCurrentFolderId(folderId); // Оновлюємо ID папки
    setFiles([]);  // Очищаємо файли перед завантаженням нових
    loadFiles(currentDriveId, folderId);  // Завантажуємо файли для цієї папки
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Отримуємо вибраний файл
    if (!file) return;

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [currentFolderId], // Завантажуємо в поточну папку
    };

    const formData = new FormData();
    // Додаємо метадані файлу
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    // Додаємо сам файл
    formData.append('file', file);

    const request = gapi.client.request({
      path: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/related',
      },
      body: formData,
    });

    request.execute(function(response) {
      if (response.error) {
        console.error("Error uploading file:", response.error);
      } else {
        console.log("File uploaded successfully:", response);
        loadFiles(currentDriveId, currentFolderId); // Оновлюємо список файлів після завантаження
      }
    });
  };

//   const handleFileDownload = (fileId, mimeType) => {
//     // Якщо це не Google Docs файл, виконуємо стандартне скачування
//     if (mimeType !== 'application/vnd.google-apps.document' && 
//         mimeType !== 'application/vnd.google-apps.spreadsheet' &&
//         mimeType !== 'application/vnd.google-apps.presentation') {
//       gapi.client.drive.files.get({
//         fileId: fileId,
//         alt: 'media',
//       }).then((response) => {
//         const blob = new Blob([response.body], { type: mimeType });
//         const fileUrl = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = fileUrl;
//         a.download = 'downloaded-file'; // Ви можете задати тут ім'я файлу
//         a.click();
//         URL.revokeObjectURL(fileUrl);
//       }).catch((error) => {
//         console.error("Error downloading file: ", error);
//       });
//     } else {
//       // Для Google Docs, Sheets, Slides виконуємо експорт
//       const exportMimeType = mimeType === 'application/vnd.google-apps.document' 
//         ? 'application/pdf'  // Google Docs експортуємо в PDF
//         : mimeType === 'application/vnd.google-apps.spreadsheet'
//         ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Google Sheets в Excel
//         : 'application/pdf'; // Google Slides в PDF
  
//       gapi.client.drive.files.export({
//         fileId: fileId,
//         mimeType: exportMimeType
//       }).then((response) => {
//         const fileUrl = URL.createObjectURL(response.body);
//         const a = document.createElement('a');
//         a.href = fileUrl;
//         a.download = response.result.name || 'exported-file'; // Назва при експорті
//         a.click();
//         URL.revokeObjectURL(fileUrl); // Очищаємо URL
//       }).catch((error) => {
//         console.error("Error exporting file: ", error);
//       });
//     }
//   };
  

const handleFileDownload = (fileId, mimeType, fileName) => {
    const accessToken = gapi.auth.getToken().access_token;
  
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const fileUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName || 'downloaded-file';
      a.click();
      URL.revokeObjectURL(fileUrl);
    })
    .catch(error => {
      console.error("Error downloading file: ", error);
    });
  };
  
    
  
  

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      <button onClick={handleSignOut}>Sign out</button>
      <div>
        <h3>Shared Drives</h3>
        <ul>
          {sharedDrives.map(drive => (
            <li key={drive.id}>
              <span onClick={() => handleDriveClick(drive.id)} style={{ cursor: 'pointer' }}>
                📂 {drive.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Files and Folders</h3>
        <ul>
        {files.map(file => (
    <li key={file.id}>
      {file.mimeType === 'application/vnd.google-apps.folder' ? (
        <span onClick={() => handleFolderClick(file.id)} style={{ cursor: 'pointer' }}>📁 {file.name}</span>
      ) : (
        <span>
          📄 {file.name}
          { file.thumbnailLink ? (
            <img src={file.thumbnailLink} alt={file.name} style={{ width: 100, height: 'auto' }} />
          ) : null}
          <button onClick={() => handleFileDownload(file.id, file.mimeType, file.name)}>Download</button>
        </span>
      )}
    </li>
))}

        </ul>
      </div>
      <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={() => document.querySelector('input[type="file"]').click()}>Upload File</button>
      </div>
    </div>
  );
}

export default GoogleDriveFileManager;
