import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { OrderHistory } from '../../components';
import { getUserOrderHistory } from '../../redux/Orders/actions';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: "center",
        color: "rgb(216, 91, 75)"
    }
}));

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data,
});

const DashBoard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id))
    },[currentUser.id, dispatch])

    return (
        <div>
            <h1 className={classes.title}>Order History</h1>
            <OrderHistory orders={orderHistory} />
        </div>
    )
}

export default DashBoard
