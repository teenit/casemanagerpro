import { Alert, IconButton } from '@mui/material'
import React, { useEffect } from 'react'

const SmallNotification = ({ isSuccess, text, close }) => {
  const timeout = text.length>50?5000:3000
  useEffect(() => {
    const timer = setTimeout(() => {
      close()
    }, timeout);
    return () => clearTimeout(timer);
  }, [close, timeout])

  return (
    <div className='SmallNotification'>
      <Alert sx={{zIndex: 9999}} variant="filled" severity={isSuccess?"success":"error"}>
        {text}
      </Alert>
    </div>
  );
};

export default SmallNotification;
