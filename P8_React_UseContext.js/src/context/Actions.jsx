

export function setDarkMode(dispatch) {
  dispatch({ type: "SET_DARK_MODE", payload: true })
}


export const handleRegister = async (formData) => {

  try {

    const url = "http://localhost:5095/api/User/Register"

    
    const response = await axios.post(url, formData)
    if (response.status === 200) {
      toast.success(response.data.message)
      return true

    }


  } catch (error) {

    const statCodesArr = [400, 401, 403, 404, 500]
    if (error.status) {
      if (statCodesArr.includes(error.status)) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Some Network Error!")
      }
    }

    return false


    // toast.error("Some Error!")
  }





}


export const handleLogin = async (e, form, dispatch) => {

  e.preventDefault()

  try {
    const url = "http://localhost:5095/api/User/Login"
    const res = await axios.post(url, form)

    if (res.status === 200) {
      toast.success(res.data.message)


      dispatch({ type: "SET_USER", payload: res.data.payload })


      navigate("/user/dashboard")

    }

  } catch (error) {
    const statCodesArr = [400, 401, 403, 404, 500]

    if (error.status) {
      if (statCodesArr.includes(error.status)) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Some Network Error!")
      }
    }
  }

}
