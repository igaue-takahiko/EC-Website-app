import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import './Loading.scss';
import { getLoadingState, getLoadingText } from '../../redux/Loading/selectors';

const Loading = ({ children }) => {
    const selector = useSelector(state => state);
    const isBeingLoading = getLoadingState(selector);
    const loadingText = getLoadingText(selector)

    return (
        <div>
            {(isBeingLoading) && (
                <section className="section__loading">
                    <CircularProgress />
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </div>
    )
}

export default Loading
