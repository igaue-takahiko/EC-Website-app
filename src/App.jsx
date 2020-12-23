import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/actions';
import './default.scss';

import { WithAuth, WithAdminAuth } from './hoc';
import { AdminToolbar } from './components';

import {
    AdminLayout,
    DashBoardLayout,
    HomePageLayout,
    MainLayout,
} from './Layouts';

import {
    Admin,
    HomePage,
    Recovery,
    Registration,
    Login,
    DashBoard,
    Search
} from './pages';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession)
    },[dispatch]);

    return (
        <div className="App">
            <AdminToolbar />
            <Switch>
                <Route exact path="/" render={() => (
                    <HomePageLayout>
                        <HomePage />
                    </HomePageLayout>
                )} />
                <Route exact path="/search" render={() => (
                    <MainLayout>
                        <Search />
                    </MainLayout>
                )} />
                <Route path="/search/:filterType" render={() => (
                    <MainLayout>
                        <Search />
                    </MainLayout>
                )} />
                <Route path="/registration" render={() => (
                    <MainLayout>
                        <Registration />
                    </MainLayout>
                )} />
                <Route path="/login" render={() => (
                    <MainLayout>
                        <Login />
                    </MainLayout>
                )} />
                <Route path="/recovery" render={() => (
                    <MainLayout>
                        <Recovery />
                    </MainLayout>
                )} />
                <Route path="/dashboard" render={() => (
                    <WithAuth>
                        <DashBoardLayout>
                            <DashBoard />
                        </DashBoardLayout>
                    </WithAuth>
                )} />
                <Route path="/admin" render={() => (
                    <WithAdminAuth>
                        <AdminLayout>
                            <Admin />
                        </AdminLayout>
                    </WithAdminAuth>
                )} />
            </Switch>
        </div>
    );
}

export default App;
