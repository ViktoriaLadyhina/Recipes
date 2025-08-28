import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './search.scss';
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import recipeSlice, { getRecipes } from '../../store/features/RecipeSlice';
import { getCategories } from '../../store/features/CategoriesSlice'; 
import RecipeCard from '../../components/recipeCard/RecipeCard';
import CategoryCard from '../../components/categoryCard/CategoryCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const recipes = useSelector(recipeSlice.selectors.getAllRecipes);
    const categories = useSelector(state => state.categories.items); 

    const [filteredResults, setFilteredResults] = useState({
        recipes: [],
        categories: []
    });

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(getRecipes());
        }
        if (categories.length === 0) {
            dispatch(getCategories());
        }

        if (query.length >= 2) {
            const filteredRecipes = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(query.toLowerCase())
            );

            const filteredCategories = categories.filter(cat =>
                cat.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredResults({
                recipes: filteredRecipes,
                categories: filteredCategories
            });
        } else {
            setFilteredResults({ recipes: [], categories: [] });
        }
    }, [dispatch, recipes, categories, query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const history = [
        { label: "All recipes", path: "/" },
        { label: "Search recipes" }
    ];

    return (
        <div className='container'>
            <div className='search'>
                <BreadCrumbs history={history} />
                <div className='search__title'>Search recipes & categories</div>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search recipes or categories..."
                    className='search__input'
                />
            </div>

            {query.length === 0 ? null : query.length === 1 ? (
                <div className="search__message">
                    <h2>Type at least 2 characters to start searching</h2>
                </div>
            ) : filteredResults.recipes.length === 0 && filteredResults.categories.length === 0 ? (
                <div className="search__message">
                    <h2>No recipes or categories found</h2>
                </div>
            ) : (
                <>
                    {filteredResults.categories.length > 0 && (
                        <>
                            <h2 className="search__subtitle">Categories</h2>
<div className="search__list">
    {filteredResults.categories.map((cat, id) => (
        <CategoryCard key={id} category={cat} />
    ))}
</div>
                        </>
                    )}

                    {filteredResults.recipes.length > 0 && (
                        <>
                            <h2 className="search__subtitle">Recipes</h2>
                            <div className="search__results">
                                {filteredResults.recipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;