import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const result = await fetch('https://dummyjson.com/recipes/tags')
            const data = await result.json()
            return data
        }
        catch (error) {
            console.error('Error fetching categories:', error)
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    selectors: {
        getAllCategories: (state => state.items)
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
    }
})

export default categoriesSlice;