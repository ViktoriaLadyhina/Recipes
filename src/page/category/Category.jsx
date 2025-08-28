import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import {
  getCategory,
  getCategoryItems,
  selectCategoryLoading,
  getCurrentCategoryName
} from '../../store/features/CategoriesSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard.jsx';
import './category.scss';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs.jsx';
import FiltersSort from '../../components/filterSort/FilterSort.jsx';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice.js';
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice.js';
import Pagination from '../../components/pagination/Pagination.jsx';

const Category = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();


  // Данные категории
  const categoryItems = useSelector(getCategoryItems);
  const categoryLoading = useSelector(selectCategoryLoading);
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

  // пагинация
  const [currentPage, setCurrentPage] = useState(1);
const [recipesPerPage, setRecipesPerPage] = useState(8);

  useEffect(() => {
  const updatePerPage = () => {
    const width = window.innerWidth;
    if (width >= 1450) setRecipesPerPage(8);   // 4 в ряд * 2 ряда
    else if (width >= 768) setRecipesPerPage(6); // 3 в ряд * 2 ряда
    else setRecipesPerPage(4);                // 1-2 в ряд * 2 ряда
  };

  updatePerPage();
  window.addEventListener('resize', updatePerPage);
  return () => window.removeEventListener('resize', updatePerPage);
}, []);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = filteredCategoryRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const totalPages = Math.ceil(filteredCategoryRecipes.length / recipesPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  // хлебные крошки
  const history = [
    { label: "All recipes", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: categoryName }
  ];

  return (
    <div className="container">
      <div className="category">
        <BreadCrumbs history={history} />
        <div className="category__title">{categoryName}</div>

        <FiltersSort />

        <div className="category__container">
          {(categoryLoading || recipesLoading) ? (
            <p>Loading...</p>
          ) : currentRecipes.length > 0 ? (
            currentRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="category__empty">No recipes found</p>
          )}
        </div>

        {filteredCategoryRecipes.length > recipesPerPage && (
          <Pagination
            totalItems={filteredCategoryRecipes.length}
            itemsPerPage={recipesPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        
      </div>
    </div>
  );
};

export default Category;