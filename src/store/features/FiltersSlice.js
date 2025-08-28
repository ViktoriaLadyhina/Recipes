import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        mealType: '',
        difficulty: '',
        maxTime: null,
        maxCalories: null
    },
    sort: 'default'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters(state) {
            state.filters = initialState.filters;
        },
        setSort(state, action) {
            state.sort = action.payload;
        }
    }
});

export const selectFilteredSortedRecipes = (recipes, filtersState) => {
    let filtered = [...recipes];
    const { filters, sort } = filtersState;

    // ----------------- ФИЛЬТРАЦИЯ -----------------

    // Фильтр по Meal Type (тип приёма пищи: Breakfast, Lunch, Dinner, Snack)
    if (filters.mealType.length) {
        filtered = filtered.filter(r => r.mealType.includes(filters.mealType));
    }

    // Фильтр по Difficulty (сложность приготовления: Easy, Medium, Hard)
    if (filters.difficulty.length) {
        filtered = filtered.filter(r => r.difficulty === filters.difficulty);
    }

    // Фильтр по времени
    if (filters.maxTime) {
        const maxTime = Number(filters.maxTime);
        if (!isNaN(maxTime)) {
            filtered = filtered.filter(
                r => {
                    const time = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0);
                    return time <= maxTime;
                }
            );
        }
    }

    // Фильтр по калориям
    if (filters.maxCalories) {
        const maxCalories = Number(filters.maxCalories);
        if (!isNaN(maxCalories)) {
            filtered = filtered.filter(
                r => (r.caloriesPerServing || 0) <= maxCalories
            );
        }
    }

    // ----------------- СОРТИРОВКА -----------------

    switch (sort) {
        case 'timeAsc':
            // Сортировка по времени приготовления: от меньшего к большему
            filtered.sort((a, b) => (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes));
            break;
        case 'timeDesc':
            // Сортировка по времени приготовления: от большего к меньшему
            filtered.sort((a, b) => (b.prepTimeMinutes + b.cookTimeMinutes) - (a.prepTimeMinutes + a.cookTimeMinutes));
            break;
        case 'ratingAsc':
            // Сортировка по рейтингу: от меньшего к большему
            filtered.sort((a, b) => a.rating - b.rating);
            break;
        case 'ratingDesc':
            // Сортировка по рейтингу: от большего к меньшему
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'caloriesAsc':
            // Сортировка по калориям: от меньшего к большему
            filtered.sort((a, b) => a.caloriesPerServing - b.caloriesPerServing);
            break;
        case 'caloriesDesc':
            // Сортировка по калориям: от большего к меньшему
            filtered.sort((a, b) => b.caloriesPerServing - a.caloriesPerServing);
            break;
        case 'nameAsc':
            // Сортировка по названию: от A до Z
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            // Сортировка по названию: от Z до A
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }

    return filtered; // возвращаем отсортированный и отфильтрованный массив рецептов
};

export const { setFilter, clearFilters, setSort } = filtersSlice.actions;
export default filtersSlice;