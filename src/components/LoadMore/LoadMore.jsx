import React from 'react';
import { Button } from '../Forms';

const LoadMore = ({ onLoadMoreEvent = () => {}, }) => {
    return (
        <Button onClick={() => onLoadMoreEvent()}>
            Load More
        </Button>
    )
}

export default LoadMore;
