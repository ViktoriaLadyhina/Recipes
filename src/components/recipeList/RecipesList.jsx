import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import recipeSlice, { getRecipes } from "../../store/features/RecipeSlice"
import './recipesList.scss'
import RecipeCard from '../recipeCard/RecipeCard'
import FiltersSort from '../filterSort/FilterSort'
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice'
import Pagination from '../pagination/Pagination'

const RecipesList = () => {

  const dispatch = useDispatch()

  const allRecipes = useSelector(recipeSlice.selectors.getAllRecipes)
  const filtersState = useSelector(state => state.filters)
  const recipes = selectFilteredSortedRecipes(allRecipes, filtersState)


  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

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
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  return (
    <>
      <div className="container">
        <div className='recipes'>
          <div className='recipes__title'>All recipes</div>
          <FiltersSort />
          <div className='recipes__container'>
            {currentRecipes && currentRecipes.length > 0 ? (
              currentRecipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))
            ) : (
              <div className="recipes__empty">No recipes found</div>
            )}
          </div>
          {recipes.length > recipesPerPage && (
            <Pagination
              totalItems={recipes.length}
              itemsPerPage={recipesPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default RecipesList