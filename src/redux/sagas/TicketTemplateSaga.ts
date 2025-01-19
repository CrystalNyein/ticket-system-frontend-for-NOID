import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TCheckTemplateParams, TCheckTicketTemplate, TGetResponse } from '../../constants/types';
import { ticketTemplateService } from '../../services/TicketTemplateService';
import { setLoading } from '../slices/CommonSlice';
import { setCurrentTemplate } from '../slices/TicketTemplateSlice';
import { ticketTemplateActions } from '../actions/TicketTemplateActions';
import { PayloadAction } from '@reduxjs/toolkit';
import { SnackbarType } from '../../constants/common';
import { showSnackbar } from '../slices/SnackbarSlice';
import { AxiosResponse } from 'axios';

function* checkTemplateSaga(action: PayloadAction<TCheckTemplateParams>) {
  try {
    const response: TGetResponse<TCheckTicketTemplate> = yield call(ticketTemplateService.checkTemplate, action.payload);
    const templateData = response.data as TCheckTicketTemplate;
    if (templateData.templateExists) {
      yield put(setCurrentTemplate(templateData.template));
    } else {
      yield put(setCurrentTemplate(null));
    }
  } catch (error) {
    yield put(showSnackbar({ message: (error as AxiosResponse).data.message, type: SnackbarType.ERROR }));
    yield put(setLoading(false));
  }
}

// Watcher Saga
function* watchTicketTemplates() {
  yield all([takeLatest(ticketTemplateActions.checkTemplate.type, checkTemplateSaga)]);
}

export default watchTicketTemplates;
