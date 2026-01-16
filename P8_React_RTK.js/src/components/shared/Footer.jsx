
import { useDispatch } from '../../context/Store'



const Footer = () => {


  const {state} = useDispatch()


  
  return (
    <div className='footer'>


      <h3> All Rights Reserved 2025  {state.user.username}</h3>



    </div>
  )
}

export default Footer