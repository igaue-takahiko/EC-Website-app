import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './default.scss';

import {
    HomePageLayout,
    MainLayout
} from './Layouts';

import {
    HomePage,
    Registration,
    Login
} from './pages';

const App = (props) => {
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
            </Switch>
        </div>
    );
}

export default App;
