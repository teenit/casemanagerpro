import { useParams } from "react-router-dom";

const WrapperParams = ({ component: Component }) => {
  const params = useParams();
  return <Component params={params} />;
};

export default WrapperParams;
