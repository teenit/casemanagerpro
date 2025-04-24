import { Button } from "@mui/material";
import React from "react";
import { LANG } from "../../services/config";

const FooterDefaultModal = ({close = null, success}) => {

  return(
    <div className="FooterDefaultModal">
      {close && <Button color="error" onClick={close}>{LANG.GLOBAL.close}</Button>}
      <Button variant='contained' onClick={success}>{LANG.GLOBAL.save}</Button>
    </div>
  )

}

export default FooterDefaultModal;