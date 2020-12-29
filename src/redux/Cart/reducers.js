import { cartTypes } from './types';
import { initialState } from '../store/initialState';
import {
    handleAddToCart,
    handleRemoveCartItem,
    handleReduceCartItem,
} from './utils';

export const cartReducer = (state = initialState.cart, action) => {
    switch (action.type) {
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: handleAddToCart({
                    prevCartItems: state.cartItems,
                    nextCartItem: action.payload
                })
            };
        case cartTypes.REDUCE_CART_ITEM:
            return {
                ...state,
                cartItems: handleReduceCartItem({
                    prevCartItems: state.cartItems,
                    cartItemToReduce: action.payload
                })
            };
        case cartTypes.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: handleRemoveCartItem({
                    prevCartItems: state.cartItems,
                    cartItemToRemove: action.payload
                })
            };
        case cartTypes.CLEAR_CART:
            return {
                ...state,
                ...initialState.cart
            };
        default:
            return state;
    };
};