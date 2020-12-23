import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

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
            <Container className="controlPanel" maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid className="sidebar" item xs={12} md={3}>
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
                    </Grid>
                    <Grid className="content" item xs={12} md={9}>
                        {props.children}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default DashBoardLayout
