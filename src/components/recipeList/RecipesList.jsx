import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import recipeSlice, { getRecipes } from "../../store/features/RecipeSlice"
import './recipesList.scss'
import RecipeCard from '../recipeCard/RecipeCard'
import FiltersSort from '../filterSort/FilterSort'
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice'

const RecipesList = () => {

  const dispatch = useDispatch()

  const allRecipes = useSelector(recipeSlice.selectors.getAllRecipes)
  const filtersState = useSelector(state => state.filters)
  const recipes = selectFilteredSortedRecipes(allRecipes, filtersState)

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])


  return (
    <>
      <div className="container">
        <div className='recipes'>
          <div className='recipes__title'>All recipes</div>
          <FiltersSort />
          <div className='recipes__container'>
            {recipes && recipes.length > 0 ? (
              recipes.map((r) => (
                <div key={r.id}>
                  <RecipeCard recipe={r} />
                </div>
              ))
            ) : (
              <div className="recipes__empty">No recipes found</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesList