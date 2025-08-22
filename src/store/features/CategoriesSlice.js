import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Получение всех категорий
export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes/tags`);
            if (!res.ok) throw new Error('Ошибка при получении категорий');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
);

// Получение конкретной категории по id
export const getCategory = createAsyncThunk(
    'category/getCategory',
    async (categoryId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes/tag/${categoryId}`);
            if (!res.ok) throw new Error('Ошибка при получении категории');
            const data = await res.json();
            return data.recipes;
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null,

        categoryItems: [],
        currentCategoryName: null,
        categoryLoading: false,
        categoryError: null,
    },
    selectors: {
        getAllCategories: (state) => state.items,
        getCategory: (state) => state.categoryItems,
        getCurrentCategoryName: (state) => state.currentCategoryName,
        selectCategoryLoading: (state) => state.categoryLoading,
        selectCategoryError: (state) => state.categoryError
    },
    extraReducers: (builder) => {
        builder
            // Все категории
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Конкретная категория
            .addCase(getCategory.pending, (state) => {
                state.categoryLoading = true;
                state.categoryError = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.categoryItems = action.payload;
                state.currentCategoryName = action.meta.arg;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.categoryError = action.error.message;
            });
    }
});

export const {
    getAllCategories,
    getCategory: getCategoryItems,
    selectCategoryLoading,
    selectCategoryError,
    getCurrentCategoryName
} = categoriesSlice.selectors;

export default categoriesSlice;