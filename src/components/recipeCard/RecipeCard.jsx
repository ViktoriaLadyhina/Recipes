import './recipeCard.scss'
import { IoHeart } from "react-icons/io5";
import { HiOutlineClock } from "react-icons/hi";
import { NavLink } from 'react-router';

const RecipeCard = ({ recipe }) => {
  return (
    <NavLink to={`/recipe/${recipe.id}`}>
      <div className="recipe-card">
        <div className="recipe-card__image">
          <img src={recipe.image} alt={recipe.name} />
          <div className="recipe-card__image-heart"><IoHeart /></div>
        </div>
        <div className="recipe-card__desk">
          <div className="recipe-card__desk-time">
            <HiOutlineClock />
            <span>{recipe.cookTimeMinutes + recipe.prepTimeMinutes} min</span>
          </div>
          <div className="recipe-card__desk-title">{recipe.name}</div>
          <div className="recipe-card__desk-rating">
            Rating: <span>{recipe.rating}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default RecipeCard;