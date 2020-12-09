import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './default.scss';

import { HomePageLayout } from './Layouts';

import { HomePage } from './pages';

const App = (props) => {
    return (
        <div className="main">
            <Switch>
                <Route exact path="/" render={() => (
                    <HomePageLayout>
                        <HomePage />
                    </HomePageLayout>
                )}
                />
            </Switch>
        </div>
    );
}

export default App;
