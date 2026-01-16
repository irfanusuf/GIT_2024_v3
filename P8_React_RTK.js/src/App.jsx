
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Navbar from './components/shared/Navbar'
import { ToastContainer } from 'react-toastify'

import Login from './components/pages/Login'
import Register from './components/pages/Register'


const App = () => {
    return (
        <BrowserRouter>
        <ToastContainer/>
        <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/user/register' element={<Register/>} />
                <Route path='/user/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App