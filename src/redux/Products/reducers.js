import { productsTypes } from './types';
import { initialState } from '../store/initialState';

export const productsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case productsTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case productsTypes.SET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state;
    }
}