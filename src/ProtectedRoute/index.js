import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const custToken = process.env.REACT_APP_JWT_TOKEN
  const jwtToken = Cookies.get(custToken);


  useEffect(() => {
    if (jwtToken === undefined) {
      return navigate('/login');
    }
  }, [jwtToken, navigate]);

  if (jwtToken === undefined) {
    return null;
  }


  return props.children;
};


export default ProtectedRoute

