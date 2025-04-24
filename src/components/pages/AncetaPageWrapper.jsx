import React from "react";
import AncetaPage from "./AncetaPage";
import { useParams } from "react-router-dom";

const AncetaPageWrapper = () => {

  const params = useParams();
  const anceta_id = params.id;


  return <AncetaPage anceta_id = {anceta_id}/>
}

export default AncetaPageWrapper;