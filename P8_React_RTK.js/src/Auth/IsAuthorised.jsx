import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif";
import { verifyUser } from "../context/Actions";
import { useDispatch } from "../context/Store";

const IsAuthorised = ({ children }) => {


  const token = localStorage.getItem("Authorization_Token");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const {dispatch} = useDispatch()

  useEffect(() => {

    (async () => {

      if (!token || token === undefined || token === null || token === "") {
        setAuth(false);
        navigate("/user/account");
      } else {
        const verify = await verifyUser(token , dispatch)
        if (verify) {
          setAuth(true)
        }
      }
    })()

  }, [token]);




  if (auth) {
    return children;
  } else {
    return (
      <div>
        <img src={loadingGif} />
      </div>
    );
  }
};

export default IsAuthorised;
