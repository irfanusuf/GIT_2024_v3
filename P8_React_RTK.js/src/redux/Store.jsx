import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";




const store = configureStore({

    reducer: {
        userStore: userSlice.reducer,
     
    },

    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(pokemonApi.middleware).concat(placeHolderApi.middleware),
})


export default store