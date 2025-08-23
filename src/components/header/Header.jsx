import { NavLink } from 'react-router';
import './header.scss';
import { IoHeart } from "react-icons/io5";
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import recipeSlice from '../../store/features/RecipeSlice';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const favoriteId = useSelector(recipeSlice.selectors.getFavoriteRecipes);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="header__container container">

        <ThemeToggle />

        <div className="header__burger" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>

        <ul className={`header__nav ${isOpen ? 'header__nav--open' : ''}`}>
          <li className="header__nav-item">
            <NavLink to="/" className="header__nav-link">
              All recipes
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/categories" className="header__nav-link">
              Categories
            </NavLink>
          </li>
        </ul>

        <div className="header__icons">
          <NavLink to="/recipes/favoriteRecipes" className="header__icons-link">
            <IoHeart />
            <span className="header__icons-count">{favoriteId.length}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;