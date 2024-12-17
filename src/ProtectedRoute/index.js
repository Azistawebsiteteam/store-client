import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const custToken = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(custToken);
  const location = useLocation();

  useEffect(() => {
    if (jwtToken === undefined) {
      return navigate("/login", { state: { from: location.pathname } });
    }
  }, [jwtToken, navigate, location]);

  if (jwtToken === undefined) {
    return null;
  }
  return props.children;
};

export default ProtectedRoute;
