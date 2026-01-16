import { createContext, useReducer } from 'react'
import App from '../App';


import Reducer from './Reducer';



export const Context = createContext();

const Store = () => {

  // state 

    const intialState = {
    user: {},
    orders: [],
    order: {},
    products: [],
    product: {},
    cart: {},
    addresses: [],
    address: {},
    darkMode: false,
    loading: false,
  }



  const [state, dispatch] = useReducer(Reducer, intialState)


  // const [SSOT, setSSOT] = useState(intialState);

  // function setDarkMode() {
  //   setSSOT((prevState) => ({ ...prevState, darkMode: !SSOT.darkMode }));   // ensure state of other varibles doesnot change 
  // }


  // const handleRegister = async (formData) => {

  //   try {

  //     const url = "http://localhost:5095/api/User/Register"


  //     const response = await axios.post(url, formData)

  //     if (response.status === 200) {
  //       toast.success(response.data.message)
  //       return true

  //     }


  //   } catch (error) {

  //     const statCodesArr = [400, 401, 403, 404, 500]
  //     if (error.status) {
  //       if (statCodesArr.includes(error.status)) {
  //         toast.error(error.response.data.message)
  //       } else {
  //         toast.error("Some Network Error!")
  //       }
  //     }

  //     return false


  //     // toast.error("Some Error!")
  //   }





  // }


  // const handleLogin = async (e, form) => {

  //   e.preventDefault()

  //   try {
  //     const url = "http://localhost:5095/api/User/Login"
  //     const res = await axios.post(url, form)

  //     if (res.status === 200) {
  //       toast.success(res.data.message)
  //       setSSOT((prevState) => ({ ...prevState, user: res.data.payload }))
  //       navigate("/user/dashboard")

  //     }

  //   } catch (error) {
  //     const statCodesArr = [400, 401, 403, 404, 500]

  //     if (error.status) {
  //       if (statCodesArr.includes(error.status)) {
  //         toast.error(error.response.data.message)
  //       } else {
  //         toast.error("Some Network Error!")
  //       }
  //     }
  //   }

  // }




  return (
    <Context.Provider value={{ state , dispatch}}>
      <App />
    </Context.Provider>

  )
}

export default Store