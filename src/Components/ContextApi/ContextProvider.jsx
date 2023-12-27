import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [user,setUser] = useState([])
useEffect(()=> {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/auth/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const user = res.data.user
        setUser(user)
          
      });
},[])
const info = {user}
  return (
    <authContext.Provider value={info}>
      {children}
    </authContext.Provider>
  );
};

export default ContextProvider;
