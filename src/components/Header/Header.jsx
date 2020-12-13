import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss';
import logo from '../../assets/img/logo.png';
import { signOutUserStart } from '../../redux/User/actions';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
})

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const signOut = () => [
        dispatch(signOutUserStart())
    ]

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
                        {currentUser && [
                            <li key={1}>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>,
                            <li key={2}>
                                <span onClick={() => signOut()}>
                                    LogOut
                                </span>
                            </li>
                        ]}
                        {!currentUser && [
                            <li key={1}>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>,
                            <li key={2}>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        ]}
                    </ul>
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = { currentUser: null };

export default Header;
