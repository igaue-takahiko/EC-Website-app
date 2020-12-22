import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import './Header.scss';
import logo from '../../assets/img/logo.png';
import { signOutUserStart } from '../../redux/User/actions';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
})

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const [ click, setClick ] = useState(false);

    const handleClick = () => setClick(!click);
    const closeModalMenu = useCallback((event) =>{
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setClick(false)
    },[setClick]);

    const signOut = () => [
        dispatch(signOutUserStart())
    ]

    return (
        <header className="header">
            <div className="header__space"></div>
            <div className="wrap">
                <div className="logo" onClick={closeModalMenu}>
                    <Link to="/">
                        <img src={logo} alt="K2-shop"/>
                    </Link>
                </div>
                <IconButton className="menu__icon" onClick={handleClick}>
                    {click ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                </IconButton>
                    <ul className={click ? "header__menu active" : "header__menu"}>
                        <li className="header__item">
                            <Link className="header__links" to="/" onClick={closeModalMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link className="header__links" to="/search" onClick={closeModalMenu}>
                                Search
                            </Link>
                        </li>
                        <li className="header__item">
                            <Link className="header__links" to="/" onClick={closeModalMenu}>
                                Your Cart
                            </Link>
                        </li>
                        {currentUser && [
                            <li className="header__item" key={1}>
                                <Link className="header__links" to="/dashboard" onClick={closeModalMenu}>
                                    Profile
                                </Link>
                            </li>,
                            <li className="header__item" key={2}>
                                <span className="header__links" onClick={() => signOut()}>
                                    <div onClick={closeModalMenu}>
                                        LogOut
                                    </div>
                                </span>
                            </li>
                        ]}
                        {!currentUser && [
                            <li className="header__item" key={1}>
                                <Link className="header__links" to="/registration" onClick={closeModalMenu}>
                                    Register
                                </Link>
                            </li>,
                            <li className="header__item" key={2}>
                                <Link className="header__links" to="/login" onClick={closeModalMenu}>
                                    Login
                                </Link>
                            </li>
                        ]}
                    </ul>
            </div>
        </header>
    )
}

Header.defaultProps = { currentUser: null };

export default Header;
