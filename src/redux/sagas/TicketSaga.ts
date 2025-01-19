import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ticketService } from '../../services/TicketService';
import { createTicketSuccess, deleteTicketSuccess, getTicketsSuccess, setCurrentTicket, updateTicketSuccess } from '../slices/TicketSlice';
import { TCreateOrUpdateResponse, TTicket, TTicketCreateParams, TTicketUpdateParams, TGetResponse, TTicketScanResponse } from '../../constants/types';
import { showSnackbar } from '../slices/SnackbarSlice';
import { setLoading } from '../slices/CommonSlice';
import { SnackbarType } from '../../constants/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentTicket } from '../selectors/TicketSelector';
import { ticketActions } from '../actions/TicketActions';
import { AxiosResponse } from 'axios';
import { setCurrentBuyer } from '../slices/BuyerSlice';

// Worker Saga: Get Tickets
function* getTicketsSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TTicket> = yield call(ticketService.getAllTickets);
    yield put(getTicketsSuccess(response.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Add Ticket
function* createTicketSaga(action: PayloadAction<TTicketCreateParams>) {
  try {
    yield put(setLoading(true));
    const response: TCreateOrUpdateResponse<TTicket> = yield call(ticketService.createTicket, action.payload);
    yield put(createTicketSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Bluk Create Ticket
function* bulkCreateTicketSaga(action: PayloadAction<TTicketCreateParams>) {
  try {
    yield put(setLoading(true));
    const response: TCreateOrUpdateResponse<TTicket> = yield call(ticketService.bulkCreateTicket, action.payload);
    yield put(createTicketSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Safa: Update Ticket
function* updateTicketSaga(action: PayloadAction<TTicketUpdateParams>) {
  try {
    yield put(setLoading(true));
    const currentTicket: TTicket = yield select(selectCurrentTicket);
    const response: TCreateOrUpdateResponse<TTicket> = yield call(ticketService.updateTicket, currentTicket?.id, action.payload);
    yield put(updateTicketSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Worker Saga: Delete Ticket
function* deleteTicketSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(ticketService.deleteTicket, action.payload);
    yield put(deleteTicketSuccess(action.payload));
    yield put(showSnackbar({ message: 'Ticket Deleted Successfully!', type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Scan Ticket
function* scanTicketSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TTicketScanResponse> = yield call(ticketService.scanTicket, action.payload);
    yield put(setCurrentTicket((response.data as TTicketScanResponse).ticket));
    yield put(setCurrentBuyer((response.data as TTicketScanResponse).buyer));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Watcher Saga
function* watchTickets() {
  yield all([
    takeLatest(ticketActions.getList.type, getTicketsSaga),
    takeLatest(ticketActions.create.type, createTicketSaga),
    takeLatest(ticketActions.bulkCreate.type, bulkCreateTicketSaga),
    takeLatest(ticketActions.update.type, updateTicketSaga),
    takeLatest(ticketActions.delete.type, deleteTicketSaga),
    takeLatest(ticketActions.scan.type, scanTicketSaga),
  ]);
}
export default watchTickets;
