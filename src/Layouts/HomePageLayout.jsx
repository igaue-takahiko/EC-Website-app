import React from 'react';
import { Header, Footer } from './../components';

const HomePageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header {...props} />
            {props.children}
            <Footer />
        </div>
    )
}

export default HomePageLayout
