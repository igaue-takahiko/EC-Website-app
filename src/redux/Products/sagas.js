import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from '../../firebase';
import { setProducts, setProduct, fetchProductsStart } from './actions';
import {
    handleAddProduct,
    handleFetchProducts,
    handleFetchProduct,
    handleDeleteProduct
} from './helpers';
import { productsTypes } from './types';

export function* addProduct({ payload }) {
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserID: auth.currentUser.uid,
            createdDate: timestamp
        })
        yield put(fetchProductsStart())
    } catch (error) {
        alert(error.message)
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts(payload)
        yield put(setProducts(products))
    } catch (error) {
        alert(error.message)
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload)
        yield put(fetchProductsStart())
    } catch (error) {
        alert(error.message)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(setProduct(product))
    } catch (error) {
        alert(error.message)
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ])
}