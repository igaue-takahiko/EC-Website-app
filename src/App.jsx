import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './default.scss';

import {
    HomePageLayout,
    MainLayout
} from './Layouts';

import {
    HomePage,
    Recovery,
    Registration,
    Login
} from './pages';

const App = () => {
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
            </Switch>
        </div>
    );
}

export default App;
