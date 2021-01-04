import { LoadingTypes } from './types';
import { initialState } from '../store/initialState';

export const loadingReducer = (state = initialState.loading, action) => {
    switch (action.type) {
        case LoadingTypes.HIDE_LOADING:
            return {
                ...state,
                ...action.payload,
            }
        case LoadingTypes.SHOW_LOADING:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};