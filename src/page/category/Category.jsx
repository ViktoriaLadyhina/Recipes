import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";
import { getCategory, getCategoryItems, selectCategoryLoading, selectCategoryError, getCurrentCategoryName } from '../../store/features/CategoriesSlice';
import RecipeCard from '../../components/recipeCard/RecipeCard';
import './category.scss'

const Category = () => {
    const dispatch = useDispatch()
    const { categoryId } = useParams()

    const categoryItems = useSelector(getCategoryItems);
    const categoryLoading = useSelector(selectCategoryLoading);
    const categoryError = useSelector(selectCategoryError);
    const categoryName = useSelector(getCurrentCategoryName);

    useEffect(() => {
        if (categoryId) dispatch(getCategory(categoryId))
    }, [dispatch, categoryId])

    if (categoryLoading) return <p>Loading...</p>
    if (categoryError) return <p>Error {categoryError}</p>


    return (
        <div className="container">
            <div className="category">
                <div className="category__title">{categoryName}</div>

                <div className="category__container">
                    {categoryItems.length > 0 ? (
                        categoryItems.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <p className="category__empty">Рецепты не найдены</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Category