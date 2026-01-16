




const Reducer = (state, action) => {

    // if(action.type === "SET_DARK_MODE"){
    //     return ({...state , darkMode : true })
    // }


    // if(action.type === "GET_USER"){
    //     return ( {...state , user : action.payload})

    // }


    switch (action.type) {

        case "SET_DARK_MODE":
            return { ...state, darkMode: !state.darkMode };

        case "SET_USER":
            return { ...state, user: action.payload }

        case "GET_ORDERS":
            return { ...state, orders: action.payload };

        case "GET_PRODUCTS":
            return { ...state, products: action.payload };

        case "GET_ADDRESS":
            return { ...state, address: action.payload };

        default:
        return state;

    }







}

export default Reducer