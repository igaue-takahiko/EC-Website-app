import { userTypes } from './types';
import { initialState } from '../store/initialState';

export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: [],
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...initialState.user
            }
        default:
            return state;
    }
};