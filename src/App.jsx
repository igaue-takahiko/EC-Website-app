import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/actions';
import './default.scss';

import { WithAuth } from './hoc';

import {
    DashBoardLayout,
    HomePageLayout,
    MainLayout,
} from './Layouts';

import {
    HomePage,
    Recovery,
    Registration,
    Login,
    DashBoard
} from './pages';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession)
    },[dispatch]);

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => (
                    <HomePageLayout>
                        <HomePage />
                    </HomePageLayout>
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
            </Switch>
        </div>
    );
}

export default App;
