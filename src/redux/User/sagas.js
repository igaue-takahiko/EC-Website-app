import { takeLatest, call, all, put } from 'redux-saga/effects';
import { userTypes } from './types';
import {
    auth,
    handleUserProfile,
    getCurrentUser,
    googleProvider
} from '../../firebase';
import {
    signInSuccess,
    signOutUserSuccess,
    resetPasswordSuccess,
    userError,
} from './actions';
import { handleResetPasswordAPI } from './helpers';

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        yield put(signInSuccess({
            id: snapshot.id,
            ...snapshot.data()
        }))
    } catch (error) {
        alert(error.message)
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    if (email === "") {
        const error = ['The email must be entered'];
        yield put(userError(error))
        return;
    };
    if (password === "") {
        const error = ['The password must be entered'];
        yield put(userError(error))
        return;
    };
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        alert(error.message);
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        alert(error.message);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess())
    } catch (error) {
        alert(error.message)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
}}) {
    if (displayName === "") {
        const error = ['The name must be entered'];
        yield put(userError(error))
        return;
    };
    if (email === "") {
        const error = ['The email must be entered'];
        yield put(userError(error))
        return;
    };
    if (password === "") {
        const error = ['The password must be entered'];
        yield put(userError(error))
        return;
    };
    if (password !== confirmPassword) {
        const error = ['Password Don\'t match'];
        yield put(userError(error))
        return;
    };

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)
    } catch (error) {
        alert(error.message)
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
    try {
        yield call(handleResetPasswordAPI, email);
        yield put(resetPasswordSuccess())
    } catch (error) {
        yield put(userError(error))
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        alert(error.message)
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSaga() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart),
    ])
}