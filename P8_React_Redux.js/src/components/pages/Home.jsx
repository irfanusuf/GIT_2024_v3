import { useDispatch } from "react-redux";
import { handlGetProduct } from "../../Redux/Actions";


const Home = () =>  {

 const dispatch = useDispatch()


  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "50%", margin: "auto" , minHeight:"90vh" }}>
 

      <button onClick={()=>{

        
           dispatch( handlGetProduct()) 


      }} className="bg-gray-600"> SIMULATE PRODUCT API CALL</button>




    </div>
  );
}

export default Home