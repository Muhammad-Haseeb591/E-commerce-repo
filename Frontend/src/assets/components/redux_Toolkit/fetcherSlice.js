import { createSlice } from '@reduxjs/toolkit'
const fetchProducts = createAsyncThunk('/admin/getproducts', async () => {
    const response = await fetch( "http://localhost:3000/admin/getproducts");
    return response.json();
  });
