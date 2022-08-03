import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
  productTotalQuantity: 0,
  productTotalAmount: 0,
};

export const productsData = createAsyncThunk(
  "products/productsData",
  async () => {
    const response = await axios.get("http://localhost:5003/products");
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsData.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsData.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsData.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlice.reducer;
