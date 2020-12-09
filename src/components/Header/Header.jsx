import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import logo from '../../assets/img/logo.png';

const Header = (props) => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="K2-shop"/>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/">
                                Your Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
