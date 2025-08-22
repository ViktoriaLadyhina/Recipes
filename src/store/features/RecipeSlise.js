import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRecipes = createAsyncThunk(
    'recipes/getRecipes',
    async () => {
        try {
            const result = await fetch('https://dummyjson.com/recipes')
            const data = await result.json()
            return data.recipes
        }
        catch (error) {
            console.error('Error fetching recipes:', error)
        }
    }
)

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    selectors: {
        getAllRecipes: (state => state.items),
        getLoading: (state => state.loading),
        getError: (state => state.error),
        getRecipeById: (state, id) => state.items.find((r) => r.id === +id),
    },
    extraReducers: (builder) => {
        builder
        .addCase(getRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
    }
})

export default recipesSlice;