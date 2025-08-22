import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./features/RecipeSlise";
import categoriesSlice from "./features/CategoriesSlice";

const store = configureStore({
    reducer: {
    [recipesSlice.name]: recipesSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer
    }
})

export default store