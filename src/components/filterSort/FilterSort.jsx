import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../store/features/FiltersSlice";
import "./filterSort.scss";

const FiltersSort = () => {
    const dispatch = useDispatch();
    const { filters, sort } = useSelector((state) => state.filters);
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (name, value) => {
        dispatch(filtersSlice.actions.setFilter({ [name]: value }));
    };

    const handleClearFilters = () => {
        dispatch(filtersSlice.actions.clearFilters());
    };

    const handleSortChange = (e) => {
        dispatch(filtersSlice.actions.setSort(e.target.value));
    };


    return (
        <div className="filters">
            <div className="filters__header">
                {/* Кнопка */}
                <button
                    className="filters__button"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? "Hide filters" : "Show filters"}
                </button>

                {/* Фильтры */}
                <div className={`filters__dropdown ${isOpen ? "active" : ""}`}>
                    <div className="filters__group">
                        <label htmlFor="mealType">Meal type</label>
                        <select
                            id="mealType"
                            value={filters.mealType}
                            onChange={(e) => handleFilterChange("mealType", e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>

                    <div className="filters__group">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select
                            id="difficulty"
                            value={filters.difficulty}
                            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                        </select>
                    </div>

                    <div className="filters__group">
                        <label htmlFor="maxTime">Max prep time (min)</label>
                        <input
                            type="number"
                            id="maxTime"
                            value={filters.maxTime || ""}
                            onChange={(e) => handleFilterChange("maxTime", e.target.value)}
                            placeholder="30"
                        />
                    </div>

                    <div className="filters__group">
                        <label htmlFor="maxCalories">Max calories</label>
                        <input
                            type="number"
                            id="maxCalories"
                            value={filters.maxCalories || ""}
                            onChange={(e) => handleFilterChange("maxCalories", e.target.value)}
                            placeholder="500"
                        />
                    </div>

                    <button className="filters__button" onClick={handleClearFilters}>
                        Clear filters
                    </button>
                </div>

                {/* Сортировка */}
                <div className="filters__sort">
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sort} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="nameAsc">By name A → Z</option>
                        <option value="nameDesc">By name Z → A</option>
                        <option value="ratingDesc">By rating ↓</option>
                        <option value="ratingAsc">By rating ↑</option>
                        <option value="timeAsc">By prep time ↑</option>
                        <option value="timeDesc">By prep time ↓</option>
                        <option value="caloriesAsc">By calories ↑</option>
                        <option value="caloriesDesc">By calories ↓</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FiltersSort;