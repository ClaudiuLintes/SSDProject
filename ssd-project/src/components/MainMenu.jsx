import React from 'react';
import { Link } from 'react-router-dom'
import '../css/MainMenu.css';
import logoSVG from '../assets/logo.svg'
import basketSVG from '../assets/basket.svg'
import accountSVG from '../assets/account.svg'

const MainMenu = () => {
    return (
        <nav className="MainMenu-navbar">
            <ul className="MainMenu-navbar-menu">
                <li>
                    <Link to="/home">
                        <img src={logoSVG} alt="ProjectSSD Logo" className="MainMenu-navbar-logo"></img>
                    </Link>
                </li>
                <li>
                    <input type="text" placeholder="Search..." className="MainMenu-searchbar"></input>
                </li>
                <div className="MainMenu-spacer"></div>

                <li>
                    <Link to="/basket">
                        <img src={basketSVG} alt="Basket Icon" className="MainMenu-navbar-basket"></img>
                    </Link>
                </li>
                <li>
                    <Link to="/account">
                        <img src={accountSVG} alt="Account Icon" className="MainMenu-navbar-account"></img>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainMenu