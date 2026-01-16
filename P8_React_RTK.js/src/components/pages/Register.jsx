
import { useState } from 'react'
import { Link } from "react-router-dom";
import userProfile from "../../assets/user.png";
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '../../redux/slices/userSlice';



const Register = ({ setShowRegister, userState }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    
    const formBody = { username, email, password }

    const {loading} = useSelector(state => state.userStore)




    const dispatch = useDispatch()

    return (
        <div className={true ? "regsiter-dark register " : "register-light register "} >

            <h2 style={{ textAlign: "center", color: "grey" }}> Register with us  <img src={userProfile} width={50} /> </h2>
            <form>


                <div>
                    <label> Username </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>



                <div>
                    <label> Email </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>


                <div>
                    <label> Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                </div>

                <div className="links" >
                    <p>Already have an account go to <Link to={"/user/login"}>  Login </Link> </p>
                    <p> Checkout our <Link> user agreement policy  </Link>  & <Link> Terms and Conditions</Link> </p>
                </div>

                <button 
                type="button" 
                onClick={() => {dispatch(handleRegister(formBody))}} disabled ={loading} > 
                
                
                {loading ? "Wait...." : "Register"} 


                </button>
                
            </form>
        </div>
    )
}

export default Register