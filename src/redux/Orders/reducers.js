import { ordersTypes } from './types';
import { initialState } from '../store/initialState';

export const ordersReducer = (state = initialState.orders, action) => {
    switch (action.type) {
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            };
        case ordersTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            };
        default:
            return state;
    }
};
