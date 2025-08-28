import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./features/RecipeSlice";
import categoriesSlice from "./features/CategoriesSlice";
import filtersSlice from "./features/FiltersSlice";

const store = configureStore({
    reducer: {
    [recipeSlice.name]: recipeSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer
    }
})

export default store