import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { RiSunLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Context } from "../../context/Store";
import { setDarkMode } from "../../context/Actions";


export default function Navbar() {



  const [isOpen, setIsOpen] = useState(false);

  const{state ,  dispatch  } = useContext(Context)



  return (
    <nav
      className={
        darkMode
          ? `bg-indigo-950 text-white px-6 py-4 flex items-center justify-between`
          : `bg-indigo-100 text-black px-6 py-4 flex items-center justify-between`
      }
    >

      <div className="text-2xl font-bold">MyBrand</div>
      <div>
        <ul className=" gap-4 hidden sm:flex">
          <li> <Link to="/">Home </Link> </li>
          <li>  <Link to="/about">  About </Link>  </li>
          <li> <Link to="/user/Account">  Account </Link> </li>
          <li> <Link to="/services">Services </Link> </li>
        </ul>
      </div>
      <div>


        <p> Welcome {state.user.username}</p>


        <button
          className="mx-7 hidden sm:block "
          onClick={() => {
            setDarkMode(dispatch);
            // console.log("dark mode" + " : " + darkMode);
          }}
        >
           <span className="text-xl">{darkMode ? <RiSunLine/> : <GiNightSleep/>}  </span>  
        </button>



        <button
          className="mx-7 sm:hidden focus:outline-none"
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen);
          }}
        >
          <GiHamburgerMenu style={{ fontSize: 22 }} />
        </button>


      </div>




    </nav>
  );
}
