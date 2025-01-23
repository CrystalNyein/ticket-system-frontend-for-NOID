import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/AuthSlice';
import commonReducer from './slices/CommonSlice';
import snackbarReducer from './slices/SnackbarSlice';
import eventReducer from './slices/EventSlice';
import ticketTypeReducer from './slices/TicketTypeSlice';
import ticketReducer from './slices/TicketSlice';
import ticketTemplateReducer from './slices/TicketTemplateSlice';
import buyerReducer from './slices/BuyerSlice';
import userReducer from './slices/UserSlice';
import ticketScanReducer from './slices/TicketScanSlice';
import { rootSaga } from './sagas/rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    snackbar: snackbarReducer,
    events: eventReducer,
    ticketTypes: ticketTypeReducer,
    tickets: ticketReducer,
    ticketTemplates: ticketTemplateReducer,
    buyers: buyerReducer,
    users: userReducer,
    ticketScans: ticketScanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the sagas
sagaMiddleware.run(rootSaga);

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
