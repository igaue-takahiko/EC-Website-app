import { LoadingTypes } from './types';

export const hideLoadingAction = () => ({
    type: LoadingTypes.HIDE_LOADING,
    payload: { state: false, text: "" }
});

export const showLoadingAction = (text = "loading...") => ({
    type: LoadingTypes.SHOW_LOADING,
    payload: { state: true, text: text }
});
