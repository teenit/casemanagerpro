import { useNavigate, useParams } from "react-router-dom";

const WrapperParams = ({ component: Component }) => {
  const params = useParams();
  const navigate = useNavigate()
  return <Component params={params} navigate={navigate} />;
};

export default WrapperParams;
