import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { eventService } from '../../services/EventService';
import { createEventSuccess, deleteEventSuccess, getEventsSuccess, setRecentEvent, updateEventSuccess } from '../slices/EventSlice';
import { TCreateOrUpdateResponse, TEvent, TEventCreateUpdateParams, TGetResponse, TRecentEvent } from '../../constants/types';
import { showSnackbar } from '../slices/SnackbarSlice';
import { setLoading } from '../slices/CommonSlice';
import { SnackbarType } from '../../constants/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentEvent } from '../selectors/EventSelector';
import { eventActions } from '../actions/EventActions';
import { AxiosResponse } from 'axios';
import { setEventTicketStat } from '../slices/TicketSlice';

// Worker Saga: Get Events
function* getEventsSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TEvent> = yield call(eventService.getAllEvents);
    yield put(getEventsSuccess(response.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Add Event
function* createEventSaga(action: PayloadAction<TEventCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const response: TCreateOrUpdateResponse<TEvent> = yield call(eventService.createEvent, action.payload);
    yield put(createEventSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Safa: Update Event
function* updateEventSaga(action: PayloadAction<TEventCreateUpdateParams>) {
  try {
    yield put(setLoading(true));
    const currentEvent: TEvent = yield select(selectCurrentEvent);
    const response: TCreateOrUpdateResponse<TEvent> = yield call(eventService.updateEvent, currentEvent?.id, action.payload);
    yield put(updateEventSuccess(response.data));
    yield put(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Worker Saga: Delete Event
function* deleteEventSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(eventService.deleteEvent, action.payload);
    yield put(deleteEventSuccess(action.payload));
    yield put(showSnackbar({ message: 'Event Deleted Successfully!', type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Get Recent Event Stats
function* getRecentEventStatsSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TRecentEvent> = yield call(eventService.getRecentEventStats);
    yield put(setRecentEvent((response.data as TRecentEvent).event));
    yield put(setEventTicketStat({ ticketCount: (response.data as TRecentEvent).ticketCount, soldTicketCount: (response.data as TRecentEvent).soldTicketCount }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Watcher Saga
function* watchEvents() {
  yield all([
    takeLatest(eventActions.getList.type, getEventsSaga),
    takeLatest(eventActions.create.type, createEventSaga),
    takeLatest(eventActions.update.type, updateEventSaga),
    takeLatest(eventActions.delete.type, deleteEventSaga),
    takeLatest(eventActions.getRecentStats.type, getRecentEventStatsSaga),
  ]);
}
export default watchEvents;
