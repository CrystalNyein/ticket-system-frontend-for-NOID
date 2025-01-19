import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ticketTypeService } from '../../services/TicketTypeService';
import { createTicketTypeSuccess, deleteTicketTypeSuccess, getTicketTypesSuccess, updateTicketTypeSuccess } from '../slices/TicketTypeSlice';
import { TCreateOrUpdateResponse, TTicketType, TTicketTypeCreateUpdateParams, TGetResponse } from '../../constants/types';
import { showSnackbar } from '../slices/SnackbarSlice';
import { setLoading } from '../slices/CommonSlice';
import { SnackbarType } from '../../constants/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentTicketType } from '../selectors/TicketTypeSelector';
import { ticketTypeActions } from '../actions/TicketTypeActions';
import { AxiosResponse } from 'axios';

// Worker Saga: Get TicketTypes
function* getTicketTypesSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TTicketType> = yield call(ticketTypeService.getAllTicketTypes);
    yield put(getTicketTypesSuccess(response.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Add TicketType
function* createTicketTypeSaga(action: PayloadAction<TTicketTypeCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const response: TCreateOrUpdateResponse<TTicketType> = yield call(ticketTypeService.createTicketType, action.payload);
    yield put(createTicketTypeSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Safa: Update TicketType
function* updateTicketTypeSaga(action: PayloadAction<TTicketTypeCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const currentTicketType: TTicketType = yield select(selectCurrentTicketType);
    const response: TCreateOrUpdateResponse<TTicketType> = yield call(ticketTypeService.updateTicketType, currentTicketType?.id, action.payload);
    yield put(updateTicketTypeSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Worker Safa: Delete TicketType
function* deleteTicketTypeSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(ticketTypeService.deleteTicketType, action.payload);
    yield put(deleteTicketTypeSuccess(action.payload));
    yield put(showSnackbar({ message: 'TicketType Deleted Successfully!', type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Watcher Saga
function* watchTicketTypes() {
  yield all([
    takeLatest(ticketTypeActions.getList.type, getTicketTypesSaga),
    takeLatest(ticketTypeActions.create.type, createTicketTypeSaga),
    takeLatest(ticketTypeActions.update.type, updateTicketTypeSaga),
    takeLatest(ticketTypeActions.delete.type, deleteTicketTypeSaga),
  ]);
}
export default watchTicketTypes;
