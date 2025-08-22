import { NavLink } from 'react-router';
import './header.scss'
import { IoHeart } from "react-icons/io5";
import { HiMenu, HiX } from 'react-icons/hi'; // иконки бургера и крестика
import { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <header>
                <div className="container">
                    <div className="burger" onClick={toggleMenu}>
                        {isOpen ? <HiX /> : <HiMenu />}
                    </div>
                    <nav className={`nav ${isOpen ? 'open' : ''}`}>
                        <ul>
                            <li><NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                All recipes</NavLink></li>
                            <li><NavLink
                                to="/categories"
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                Categories</NavLink></li>
                        </ul>
                    </nav>
                    <div className='icons'><IoHeart /></div>
                </div>
            </header>
        </>
    )
}

export default Header