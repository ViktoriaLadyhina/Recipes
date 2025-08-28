import { useDispatch, useSelector } from 'react-redux';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard';
import './favoriteRecipes.scss'
import { useEffect } from 'react';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import FiltersSort from '../../components/filterSort/FilterSort';
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice';

const FavoriteRecipes = () => {
  const dispatch = useDispatch()
  const favoriteId = useSelector(recipeSlice.selectors.getFavoriteRecipes)
  const loading = useSelector(recipeSlice.selectors.getLoading);

  const allRecipes = useSelector(recipeSlice.selectors.getAllRecipes)
  const filtersState = useSelector(state => state.filters)

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getRecipes());
    }
  }, [allRecipes.length, dispatch]);

  const favoriteRecipes = allRecipes.filter(rec => favoriteId.includes(rec.id));
  const filteredFavoriteRecipes = selectFilteredSortedRecipes(favoriteRecipes, filtersState);

  const history = [
  { label: "All recipes", path: "/" },
  { label: "Favorite recipes" }
];

  return (
    <div className='container'>
      <div className='favorite'>
        <BreadCrumbs history={history}/>
        <div className='favorite__title'>Favorite recipes</div>
        <FiltersSort />
        <div className='favorite__container'>
          {loading ? (<div>Loading recipes...</div>) :
            filteredFavoriteRecipes.length > 0 ? (
              filteredFavoriteRecipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)
            ) : (
              <div className="favorite__empty">No favorite recipes yet</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default FavoriteRecipes