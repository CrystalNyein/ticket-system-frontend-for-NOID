import { TCreateOrUpdateResponse, TGetResponse, TUser, TUserCreateUpdateParams } from '../../constants/types';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { loginSuccess } from '../slices/AuthSlice';
import { showSnackbar } from '../slices/SnackbarSlice';
import { SnackbarType } from '../../constants/common';
import { setLoading } from '../slices/CommonSlice';
import { AxiosResponse } from 'axios';
import { userService } from '../../services/UserService';
import { userActions } from '../actions/UserActions';
import { createUserSuccess, deleteUserSuccess, getUsersSuccess, updateUserSuccess } from '../slices/UserSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentUser } from '../selectors/UserSelector';

function* getMeSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TUser> = yield call(userService.getMe);
    // Dispatch login success with the user data
    yield put(loginSuccess(response.data as TUser));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

function* getUsersSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TUser> = yield call(userService.getAllUsers);
    // Dispatch login success with the user data
    yield put(getUsersSuccess(response.data as TUser[]));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Add User
function* createUserSaga(action: PayloadAction<TUserCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const response: TCreateOrUpdateResponse<TUser> = yield call(userService.createUser, action.payload);
    yield put(createUserSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Safa: Update User
function* updateUserSaga(action: PayloadAction<TUserCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const currentUser: TUser = yield select(selectCurrentUser);
    const response: TCreateOrUpdateResponse<TUser> = yield call(userService.updateUser, currentUser?.id, action.payload);
    yield put(updateUserSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Worker Safa: Delete User
function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(userService.deleteUser, action.payload);
    yield put(deleteUserSuccess(action.payload));
    yield put(showSnackbar({ message: 'User Deleted Successfully!', type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Watcher Saga
export function* watchUsers() {
  yield all([
    takeLatest(userActions.getMe.type, getMeSaga),
    takeLatest(userActions.getList.type, getUsersSaga),
    takeLatest(userActions.create.type, createUserSaga),
    takeLatest(userActions.update.type, updateUserSaga),
    takeLatest(userActions.delete.type, deleteUserSaga),
  ]);
}
