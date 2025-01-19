import { all } from 'redux-saga/effects';
import { watchAuth } from './AuthSaga';
import watchEvents from './EventSaga';
import watchTicketTypes from './TicketTypeSaga';
import watchTicketTemplates from './TicketTemplateSaga';
import watchTickets from './TicketSaga';
import { watchUsers } from './UserSaga';

export function* rootSaga() {
  yield all([watchAuth(), watchEvents(), watchTicketTypes(), watchTickets(), watchUsers(), watchTicketTemplates()]);
}
