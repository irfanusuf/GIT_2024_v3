import { createReducer } from "@reduxjs/toolkit";


const userIntialState = {
  users : [],
  user: {},
  orders: [],
  order: {},
  cart: {},
  addresses: [],
  address: {},
  darkMode: false,
  loading: false,
  message : ""
};

const productIntialState = {
  loading: false,
  product: {},
  productName: "",
  description: "",
  price: 0,
};

export const userReducer = createReducer(userIntialState, (builder) => {
  builder.addCase("TOGGLE_DARK_MODE", (state, action) => {
    state.darkMode = true;
  });

  builder.addCase("REQ_USER", (state, action) => {
    state.user = action.payload;
  });




  // generic cases 

  builder.addCase("REQ_API", (state, action) => {
    state.loading = true
  });


  builder.addCase("REQ_API_FAILURE", (state, action) => {
    state.loading = false
  });



  builder.addCase("LOGIN_API_SUCCESS", (state, action) => {
    state.loading = false
    state.user = action.payload
  });

});






export const productReducer = createReducer(productIntialState, (builder) => {


  builder.addCase("REQ_PRODUCT_API", (state, action) => {
    state.loading = true
  })

  builder.addCase("REQ_PRODUCT_API_SUCCESS", (state, action) => {
    state.productName = "APPLE";
    state.price = 60;
    state.loading = false;
    state.description = "test Description ";
    state.product = action.payload;
  });

  builder.addCase("REQUEST_PRODUCT_API_FAILURE", (state, action) => {
    state.loading = false;
  });
});
