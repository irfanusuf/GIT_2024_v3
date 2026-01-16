import  {  useState } from "react";
import RegisterForm from "../molecules/Register";
import LoginForm from "../molecules/Login";


const Account = () => {
  const [showRegister, setShowRegister] = useState(true);


  return (
    <div>
      {showRegister ? (
        <RegisterForm
          setShowRegister={setShowRegister}
        />
      ) : (
        <LoginForm
          setShowRegister={setShowRegister}
        />
      )}
    </div>
  );
};

export default Account;
