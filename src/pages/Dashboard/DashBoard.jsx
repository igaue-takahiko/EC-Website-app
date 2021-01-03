import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrderHistory } from '../../components';
import { getUserOrderHistory } from '../../redux/Orders/action';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data,
});

const DashBoard = () => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.id))
    },[currentUser.id, dispatch])

    return (
        <div>
            <h1>Order History</h1>
            <OrderHistory orders={orderHistory} />
        </div>
    )
}

export default DashBoard
