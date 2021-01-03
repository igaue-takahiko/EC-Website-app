import { ordersTypes } from './types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, firebaseTimestamp } from '../../firebase';
import { setUserOrderHistory, setOrderDetails } from './action';
import { clearCart } from '../Cart/actions';
import {
    handleSaveOrder,
    handleGetUserOrderHistory,
    handleGetOrder,
} from './helper';

export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload)
        yield put(setUserOrderHistory(history))
    } catch (error) {
        alert(error.message);
    }
};

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};

export function* saveOrder({ payload }) {
    try {
        const timestamps = firebaseTimestamp.now();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps,
        })
        yield put(clearCart())
    } catch (error) {
        alert(error.message);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(setOrderDetails(order))
    } catch (error) {
        alert(error.message)
    }
};

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
    ])
}