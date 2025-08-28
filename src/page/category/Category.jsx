import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import {
  getCategory,
  getCategoryItems,
  selectCategoryLoading,
  selectCategoryError,
  getCurrentCategoryName
} from '../../store/features/CategoriesSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard.jsx';
import './category.scss';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs.jsx';
import FiltersSort from '../../components/filterSort/FilterSort.jsx';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice.js';
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice.js';

const Category = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  // Данные категории
  const categoryItems = useSelector(getCategoryItems);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);
  const categoryName = useSelector(getCurrentCategoryName);

  // Все рецепты
  const allRecipes = useSelector(recipeSlice.selectors.getAllRecipes);
  const filtersState = useSelector(state => state.filters);
  const recipesLoading = useSelector(recipeSlice.selectors.getLoading);

  // Загружаем данные категории
  useEffect(() => {
    if (categoryId) dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  // Загружаем все рецепты, если ещё нет
  useEffect(() => {
    if (!allRecipes.length) {
      dispatch(getRecipes());
    }
  }, [allRecipes.length, dispatch]);

  // Фильтруем рецепты категории
  const categoryRecipes = useMemo(() => {
    if (!allRecipes.length || !categoryItems.length) return [];
    const categoryRecipeIds = new Set(categoryItems.map(ci => ci.id));
    return allRecipes.filter(r => categoryRecipeIds.has(r.id));
  }, [allRecipes, categoryItems]);

  // Применяем фильтры и сортировку
  const filteredCategoryRecipes = selectFilteredSortedRecipes(categoryRecipes, filtersState);

  const history = [
    { label: "All recipes", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: categoryName }
  ];

  return (
    <div className="container">
      <div className="category">
        <BreadCrumbs history={history}/>
        <div className="category__title">{categoryName}</div>

        <FiltersSort />

        <div className="category__container">
          {(categoryLoading || recipesLoading) ? (
            <p>Loading...</p>
          ) : filteredCategoryRecipes.length > 0 ? (
            filteredCategoryRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="category__empty">No recipes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;