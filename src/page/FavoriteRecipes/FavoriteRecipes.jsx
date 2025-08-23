import { useDispatch, useSelector } from 'react-redux';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard';
import './favoriteRecipes.scss'
import { useEffect } from 'react';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';

const FavoriteRecipes = () => {
  const dispatch = useDispatch()
  const favoriteId = useSelector(recipeSlice.selectors.getFavoriteRecipes)
  const recipes = useSelector(recipeSlice.selectors.getAllRecipes)
  const loading = useSelector(recipeSlice.selectors.getLoading);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getRecipes());
    }
  }, [recipes.length, dispatch]);

  const favoriteRecipes = recipes.filter(rec => favoriteId.includes(rec.id));

  const history = [
  { label: "All recipes", path: "/" },
  { label: "Favorite recipes" }
];

  return (
    <div className='container'>
      <div className='favorite'>
        <BreadCrumbs history={history}/>
        <div className='favorite__title'>Favorite recipes</div>
        <div className='favorite__container'>
          {loading ? (<div>Loading recipes...</div>) :
            favoriteRecipes.length > 0 ? (
              favoriteRecipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)
            ) : (
              <div className="favorite__empty">No favorite recipes yet</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default FavoriteRecipes