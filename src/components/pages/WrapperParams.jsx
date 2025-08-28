import { useNavigate, useParams } from "react-router-dom";
import AccessCheck from "../Functions/AccessCheck";
import { useSelector } from "react-redux";

const WrapperParams = ({ component: Component }) => {
  const params = useParams();
  const navigate = useNavigate()
  const selector = useSelector(state=>state.users)
  const accessCheck = (type, right, option="")=>{
    return AccessCheck(type, right, option)
  }
  return <Component params={params} navigate={navigate} accessCheck={accessCheck} selector={selector}/>;
};

export default WrapperParams;
