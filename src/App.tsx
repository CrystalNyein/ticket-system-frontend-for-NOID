import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes, { authGuard, unAuthGuard } from './constants/routes';
import Layout from './components/Layout';
import EventPage from './pages/EventPage/EventPage';
import DashboardPage from './pages/DashboardPage';
import TicketPage from './pages/TicketPage/TicketPage';
import TicketTypePage from './pages/TicketTypePage/TicketTypePage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { Snackbar } from './components/Snackbar';
import UserPage from './pages/UserPage/UserPage';
import { allowRoles } from './constants/common';
import UnauthorizedPage from './pages/UnauthorizedPage';
import TicketTemplatePage from './pages/TicketTemplatePage/TicketTemplatePage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.LOGIN} element={<PrivateRoute element={<LoginPage />} guards={[unAuthGuard]} />} />
          <Route path={routes.INDEX} element={<PrivateRoute element={<Layout />} guards={[authGuard]} />}>
            <Route path={routes.DASHBOARD} element={<PrivateRoute element={<DashboardPage />} guards={[authGuard]} allowedRoles={allowRoles.MANAGER} />} />
            <Route path={routes.EVENT} element={<PrivateRoute element={<EventPage />} guards={[authGuard]} allowedRoles={allowRoles.MANAGER} />} />
            <Route index element={<TicketPage />} />
            <Route path={routes.TICKET_TYPE} element={<TicketTypePage />} />
            <Route path={routes.TICKET_TEMPLATE} element={<TicketTemplatePage />} />
            <Route path={routes.USER} element={<PrivateRoute element={<UserPage />} guards={[authGuard]} allowedRoles={allowRoles.ADMIN} />} />
            {/* Unauthorized Route */}
            <Route path={routes.UNAUTHORIZED} element={<UnauthorizedPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Snackbar></Snackbar>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
