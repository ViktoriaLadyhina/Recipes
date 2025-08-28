import { useDispatch, useSelector } from 'react-redux';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard';
import './favoriteRecipes.scss'
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import FiltersSort from '../../components/filterSort/FilterSort';
import { selectFilteredSortedRecipes } from '../../store/features/FiltersSlice';
import Pagination from '../../components/pagination/Pagination';

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
  const currentRecipes = filteredFavoriteRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const totalPages = Math.ceil(filteredFavoriteRecipes.length / recipesPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  // хлебные крошки
  const history = [
    { label: "All recipes", path: "/" },
    { label: "Favorite recipes" }
  ];

  return (
    <div className='container'>
      <div className='favorite'>
        <BreadCrumbs history={history} />
        <div className='favorite__title'>Favorite recipes</div>
        <FiltersSort />
        <div className='favorite__container'>
          {loading ? (<div>Loading recipes...</div>) :
            currentRecipes.length > 0 ? (
              currentRecipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)
            ) : (
              <div className="favorite__empty">No favorite recipes yet</div>
            )}
        </div>

        {filteredFavoriteRecipes.length > recipesPerPage && (
          <Pagination
            totalItems={filteredFavoriteRecipes.length}
            itemsPerPage={recipesPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </div>
  )
}

export default FavoriteRecipes