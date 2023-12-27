import axios from "axios";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:5000/auth/profile", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      
    })
    .catch((err) => {
    return  navigate("/login", {replace:true, state:{from:location}});
    });
    return children
 
};

export default PrivateRoute;
