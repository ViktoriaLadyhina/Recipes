import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRecipes = createAsyncThunk(
    'recipes/getRecipes',
    async () => {
        try {
            const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes`)
            const data = await result.json()
            return data.recipes
        }
        catch (error) {
            console.error('Error fetching recipes:', error)
        }
    }
)

const initialState = {
    items: [],
    loading: false,
    error: null,
    favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
}

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    selectors: {
        getAllRecipes: (state) => state.items,
        getLoading: (state) => state.loading,
        getError: (state) => state.error,
        getRecipeById: (state, id) => state.items.find((r) => r.id === +id),

        getFavoriteRecipes: (state) => state.favoriteRecipes
    },
    reducers: {
        addFavoriteRecipes(state, action) {
            if (state.favoriteRecipes.includes(action.payload)) {
                state.favoriteRecipes = state.favoriteRecipes.filter(id => id !== action.payload)
            } else {
                state.favoriteRecipes.push(action.payload)
            }
            localStorage.setItem('favoriteRecipes', JSON.stringify(state.favoriteRecipes));
        }
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

export const { addFavoriteRecipes } = recipeSlice.actions;

export default recipeSlice;