import React from "react";
import { NavLink } from "react-router";
import "./CategoryCard.scss";

const CategoryCard = ({ category }) => {
    return (
        <NavLink to={`/categories/${category}`}>
            <div className="category-card">
                <div className="category-card__title">{category}</div>
            </div>
        </NavLink>
    );
};

export default CategoryCard;