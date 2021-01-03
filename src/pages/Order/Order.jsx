import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from '../../redux/Orders/action';

const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderDetails
});

const Order = () => {
    const dispatch = useDispatch();
    const { orderID } = useParams();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetailsStart(orderID))
    },[dispatch, orderID])

    return (
        <div>
            <h1>Order ID: #{orderID}</h1>
        </div>
    )
}

export default Order
