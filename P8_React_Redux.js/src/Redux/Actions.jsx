
import axios from "axios"



// simple double paramed function which is equivalent to redux thunk action+

export const handlGetProduct = () => async (action) => {


    try {
        action({ type: "REQ_PRODUCT_API" })

        const res = await axios.get("/product/64qw8762873")

        if (res.status === 200) {
            action({ type: "REQ_PRODUCT_API_SUCCESS", payload: res.data.payload })
        }

    } catch (error) {
        console.log(error)
        action({ type: "REQUEST_PRODUCT_API_FAILURE" })

    }




}


export const handlLogin = (e, formBody) => async (action) => {
    e.preventDefault()

    try {
        action({ type: "REQ_API" })


        const res = await axios.post("/api/user/login", formBody)

        if (res.status === 200) {
            action({ type: "LOGIN_API_SUCCESS", payload: res.data.payload })
        }



    } catch (error) {
        console.log(error)
        action({ type: "REQ_API_FAILURE" })

    }



}






