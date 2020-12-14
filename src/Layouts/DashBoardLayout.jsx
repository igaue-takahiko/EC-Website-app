import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutUserStart } from '../redux/User/actions';
import { Header, VerticalNav, Footer } from '../components';

const DashBoardLayout = (props) => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart())
    }

    return (
        <div className="dashboardLayout">
            <Header {...props}/>
            <div className="controlPanel">
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    Home
                                </Link>
                            </li>
                            <span className="signOut" onClick={() => signOut()}>
                                Sign Out
                            </span>
                        </ul>
                    </VerticalNav>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DashBoardLayout
