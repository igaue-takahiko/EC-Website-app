import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './User/reducers';
import { productsReducer } from './Products/reducers';
import { cartReducer } from './Cart/reducers';
import { ordersReducer } from './Orders/reducers';
import { loadingReducer } from './Loading/reducers';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
    loading: loadingReducer,
})

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
}

export default persistReducer(configStorage, rootReducer);