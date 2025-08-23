import { useEffect } from "react";
import { useParams } from "react-router";
import recipeSlice, { getRecipes } from "../../store/features/RecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import './recipe.scss'
import BreadCrumbs from "../../components/breadCrumbs/BreadCrumbs";

const Recipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const recipe = useSelector((state) => recipeSlice.selectors.getRecipeById(state, id));

    const recipes = useSelector(recipeSlice.selectors.getAllRecipes);
    const loading = useSelector(recipeSlice.selectors.getLoading);
    const error = useSelector(recipeSlice.selectors.getError);

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(getRecipes());
        }
    }, [dispatch, recipes, id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>
    if (!recipe) return <div>Рецепт не найден</div>;

      const history = [
    { label: "All recipes", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: recipe.tags[0], path: `/categories/${recipe.tags[0]}` }, 
    { label: recipe.name } 
  ];

    return (
        <>
            <div className="container">
                <div className="recipe">
                    <BreadCrumbs history={history}/>
                    <div className="recipe__title">{recipe.name}</div>

                    <div className="recipe__content">
                        <div className="recipe__image"><img src={recipe.image} alt={recipe.name} /></div>

                        <div className="recipe__details">
                            <div className="recipe__time">Pre-preparation time: {recipe.prepTimeMinutes}.</div>
                            <div className="recipe__time">Cooking time: {recipe.cookTimeMinutes}</div>
                            <div className="recipe__servings">Servings: {recipe.servings}</div>
                            <div className="recipe__calories">Calories per serving: {recipe.caloriesPerServing}</div>
                            <div className="recipe__ingredients">Ingredients:
                                <ol>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="recipe__instructions">
                        <h2>Instructions</h2>
                        <ul>
                            {recipe.instructions.map((punkt, index) => (
                                <li key={index}>{punkt}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipe