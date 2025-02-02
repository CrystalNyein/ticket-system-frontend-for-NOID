import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TCheckTicketTemplateParams, TCheckTicketTemplate, TGetResponse, TTicketTemplate } from '../../constants/types';
import { ticketTemplateService } from '../../services/TicketTemplateService';
import { setLoading } from '../slices/CommonSlice';
import { deleteTicketTemplateSuccess, getTicketTemplatesSuccess, setCurrentTicketTemplate } from '../slices/TicketTemplateSlice';
import { ticketTemplateActions } from '../actions/TicketTemplateActions';
import { PayloadAction } from '@reduxjs/toolkit';
import { SnackbarType } from '../../constants/common';
import { showSnackbar } from '../slices/SnackbarSlice';
import { AxiosResponse } from 'axios';

// Worker Saga: Get TicketTemplates
function* getTicketTemplatesSaga() {
  try {
    yield put(setLoading(true));
    const response: TGetResponse<TTicketTemplate> = yield call(ticketTemplateService.getAllTicketTemplates);
    yield put(getTicketTemplatesSuccess(response.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

function* checkTicketTemplateSaga(action: PayloadAction<TCheckTicketTemplateParams>) {
  try {
    const response: TGetResponse<TCheckTicketTemplate> = yield call(ticketTemplateService.checkTicketTemplate, action.payload);
    const templateData = response.data as TCheckTicketTemplate;
    if (templateData.templateExists) {
      yield put(setCurrentTicketTemplate(templateData.template));
    } else {
      yield put(setCurrentTicketTemplate(null));
    }
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Worker Saga: Delete TicketTemplate
function* deleteTicketTemplateSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(ticketTemplateService.deleteTicketTemplate, action.payload);
    yield put(deleteTicketTemplateSuccess(action.payload));
    yield put(showSnackbar({ message: 'TicketTemplate Deleted Successfully!', type: SnackbarType.SUCCESS }));
    yield put(setLoading(false));
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}
// Watcher Saga
function* watchTicketTemplates() {
  yield all([
    takeLatest(ticketTemplateActions.getList.type, getTicketTemplatesSaga),
    takeLatest(ticketTemplateActions.delete.type, deleteTicketTemplateSaga),
    takeLatest(ticketTemplateActions.checkTemplate.type, checkTicketTemplateSaga),
  ]);
}

export default watchTicketTemplates;
