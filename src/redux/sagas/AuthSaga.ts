import { AnyAction } from 'redux-saga';
import { TLoginFormResponse } from '../../constants/types';
import { authService } from '../../services/AuthService';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authActions } from '../actions/AuthActions';
import { storage } from '../../constants/storage';
import { loginSuccess, logout } from '../slices/AuthSlice';
import { showSnackbar } from '../slices/SnackbarSlice';
import { messages } from '../../constants/messages';
import { SnackbarType } from '../../constants/common';
import { setLoading } from '../slices/CommonSlice';
import { AxiosResponse } from 'axios';

// Worker Saga for login
function* loginSaga(action: AnyAction) {
  try {
    yield put(setLoading(true));
    const response: TLoginFormResponse = yield call(authService.login, action.payload);
    const token = response.data.token;
    // Save token to localStorage
    storage.setToken(token);

    // Dispatch login success with the user data
    yield put(loginSuccess(response.data.user));
    yield put(setLoading(false));
    // Navigate to the dashboard after successful login
    window.location.reload();
  } catch (error) {
    yield put(showSnackbar({ message: messages.loginFail((error as AxiosResponse).data.message), type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

function* logoutSaga() {
  try {
    yield put(setLoading(true));
    // Call the service to clear any authentication-related data (like localStorage)
    yield call(authService.logout);

    // Dispatch the logout action to update the store
    yield put(logout());
    yield put(setLoading(false));
    // Navigate to the dashboard after successful login
    window.location.reload();
  } catch (error) {
    yield put(showSnackbar({ message: messages.logoutFail((error as AxiosResponse).data.message), type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Watcher Saga
export function* watchAuth() {
  yield all([takeLatest(authActions.login.type, loginSaga), takeLatest(authActions.logout.type, logoutSaga)]);
}
