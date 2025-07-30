import { useNavigate, useParams } from "react-router-dom";
import AccessCheck from "../Functions/AccessCheck";

const WrapperParams = ({ component: Component }) => {
  const params = useParams();
  const navigate = useNavigate()
  const accessCheck = (type, right, option="")=>{
    return AccessCheck(type, right, option)
  }
  return <Component params={params} navigate={navigate} accessCheck={accessCheck} />;
};

export default WrapperParams;
