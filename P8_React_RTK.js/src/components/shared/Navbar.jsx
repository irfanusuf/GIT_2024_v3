
import { Link } from 'react-router-dom'
// import { GiNightSleep } from "react-icons/gi";
// import { LuSun } from "react-icons/lu";




const Navbar = () => {

     const linkArr = [
        { address: "/", name: "Home" },
        

        // { address: "/about", name: "About" },
        // { address: "/services", name: "Services" },
        // { address: "/contact", name: "Contact" },
        // { address: "/gallery", name: "Gallery" },
    ]



    return (
        <div className={true ? " navbar-dark" : "navbar-light"}>


            <div className='logo'>
                <h3> Logo Here</h3>
            </div>

            <ul>
                {linkArr.map((element) => <li key={element.name}> <Link to={element.address}> {element.name}  </Link>  </li>)}
            </ul>

            {/* <div className='dark_mode_button'>
                <button onClick={  ()=>{ setDarkMode(dispatch)  } }>{!state.darkMode ? <GiNightSleep /> : <LuSun />}  </button>
            </div> */}

        </div>
    )
}

export default Navbar