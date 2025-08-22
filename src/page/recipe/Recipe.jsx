import { useEffect } from "react";
import { useParams } from "react-router";
import recipesSlice, { getRecipes } from "../../store/features/RecipeSlise";
import { useDispatch, useSelector } from "react-redux";
import './recipe.scss'

const Recipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const recipe = useSelector((state) => recipesSlice.selectors.getRecipeById(state, id));

    const recipes = useSelector(recipesSlice.selectors.getAllRecipes);
    const loading = useSelector(recipesSlice.selectors.getLoading);
    const error = useSelector(recipesSlice.selectors.getError);

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(getRecipes());
        }
    }, [dispatch, recipes, id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>
    if (!recipe) return <div>Рецепт не найден</div>;


    return (
        <>
            <div className="container">
                <div className="recipe">
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