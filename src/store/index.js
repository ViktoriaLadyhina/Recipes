import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./features/RecipeSlice";
import categoriesSlice from "./features/CategoriesSlice";

const store = configureStore({
    reducer: {
    [recipeSlice.name]: recipeSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer
    }
})

export default store