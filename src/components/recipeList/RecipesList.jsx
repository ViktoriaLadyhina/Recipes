import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import recipesSlice, { getRecipes } from "../../store/features/RecipeSlice"
import './recipesList.scss'
import RecipeCard from '../recipeCard/RecipeCard'

const RecipesList = () => {

  const dispatch = useDispatch()
  const recipes = useSelector(recipesSlice.selectors.getAllRecipes)

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])


  return (
    <>
      <div className="container">
        <div className='recipes'>
          <div className='recipes__title'>All recipes</div>
          <div className='recipes__container'>
            {recipes && recipes.map((r) => (
              <div key={r.id}>
                <RecipeCard recipe={r} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesList