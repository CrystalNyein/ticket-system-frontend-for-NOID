import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './constants/routes';
import Layout from './components/Layout';
import EventPage from './pages/EventPage';
import DashboardPage from './pages/DashboardPage';
import TicketPage from './pages/TicketPage';
import TicketTypePage from './pages/TicketTypePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.ROOT} element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path={routes.EVENT} element={<EventPage />} />
          <Route path={routes.TICKET} element={<TicketPage />} />
          <Route path={routes.TICKET_TYPE} element={<TicketTypePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
