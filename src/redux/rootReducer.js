import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './User/reducers';
import { productsReducer } from './Products/reducers';
import { cartReducer } from './Cart/reducers';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
})

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
}

export default persistReducer(configStorage, rootReducer);