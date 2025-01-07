import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetails {
  id: number;
  name: string;
  main_category: string;
  sub_category: string;
  sub_sub_category: string;
}

interface ProductsState {
  products: ProductDetails[];
  filteredProducts: ProductDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
    const response = await axios.post(
      "https://app1.crazzyhub.com/api/all-filter-product-list",
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data?.data?.product_list || [];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setFilter: (state, action) => {
      state.filteredProducts = state.products.filter(
        (product) =>
          product.main_category === action.payload.mainCategory &&
          product.sub_category === action.payload.subCategory &&
          product.sub_sub_category === action.payload.subSubCategory
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setFilteredProducts, setFilter } = productsSlice.actions;

export default productsSlice.reducer;
