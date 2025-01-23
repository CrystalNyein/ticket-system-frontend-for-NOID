import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentEvent, selectEvents, selectRecentEvent } from '../redux/selectors/EventSelector';
import { ChangeEvent, useEffect, useState } from 'react';
import moment from 'moment';
import { eventActions } from '../redux/actions/EventActions';
import { selectEventTicketStat, selectTotalTicketStat } from '../redux/selectors/TicketSelector';
import { setCurrentEvent } from '../redux/slices/EventSlice';
import { ticketActions } from '../redux/actions/TicketActions';

const DashboardPage = () => {
  const events = useSelector(selectEvents);
  const [timeFilter, setTimeFilter] = useState('month'); // 'week', 'month', 'year'
  const [periodStart, setPeriodStart] = useState(new Date());
  const recentEvent = useSelector(selectRecentEvent);
  const eventTicketStats = useSelector(selectEventTicketStat);
  const totalTicketStats = useSelector(selectTotalTicketStat);
  const currentEvent = useSelector(selectCurrentEvent);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!events.length) dispatch(eventActions.getList());
    if (!recentEvent) dispatch(eventActions.getRecentStats());
  }, []);
  useEffect(() => {
    const now = new Date();
    switch (timeFilter) {
      case 'week': {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        setPeriodStart(weekAgo);
        dispatch(ticketActions.getStatsByDate({ startDate: weekAgo, endDate: now }));
        break;
      }
      case 'month': {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        setPeriodStart(monthAgo);
        dispatch(ticketActions.getStatsByDate({ startDate: monthAgo, endDate: now }));
        break;
      }
      case 'year': {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        setPeriodStart(yearAgo);
        dispatch(ticketActions.getStatsByDate({ startDate: yearAgo, endDate: now }));
        break;
      }
      default: {
        setPeriodStart(new Date());
        break;
      }
    }
    setCurrentEvent(null);
  }, [timeFilter, dispatch]);
  const handleEventChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const event = events.filter((event) => event.id === e.target.value);
    if (event.length > 0) {
      dispatch(setCurrentEvent(event[0]));
      dispatch(ticketActions.getStatsByEvent({ eventId: event[0].id }));
    } else {
      dispatch(setCurrentEvent(null));
    }
    setTimeFilter('');
  };
  return (
    <div className="main-content-container">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" p-6 rounded shadow-md border">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-default-orange text-2xl">Recent Event</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Event Name</p>
              <p className="text-3xl font-bold text-default-orange">{recentEvent?.name}</p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Event Date</p>
              <p className="text-xl font-bold text-default-orange">
                {moment(recentEvent?.startDate).format('DD MMM')} - {moment(recentEvent?.endDate).format('DD MMM, YYYY')}
              </p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Ticket Generated</p>
              <p className="text-4xl font-bold text-default-orange">{eventTicketStats.ticketCount}</p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Ticket Sales</p>
              <p className="text-4xl font-bold text-default-orange">{eventTicketStats.soldTicketCount}</p>
            </div>
          </div>
        </div>

        <div className=" p-6 rounded shadow-md border">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-default-orange text-2xl flex-1">Ticket Stats</h4>
            <div className="flex gap-2 max-lg:flex-wrap max-lg:justify-end">
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="p-2 border hover:border-default-orange rounded">
                <option value="">Select Period</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <select value={currentEvent?.id} onChange={handleEventChange} className="p-2 border hover:border-default-orange rounded">
                <option value="all">All Events</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Event</p>
              <p className="text-3xl font-bold text-default-orange">{currentEvent ? currentEvent.name : 'ALL'}</p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Period</p>
              <p className="text-xl font-bold text-default-orange">
                {currentEvent
                  ? `${moment(currentEvent?.startDate).format('DD MMM')} - ${moment(currentEvent?.endDate).format('DD MMM, YYYY')}`
                  : `${moment(periodStart).format(`DD MMM${timeFilter === 'year' ? ', YYYY' : ''}`)} - ${moment(new Date()).format('DD MMM, YYYY')}`}
              </p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Total Ticket Sales</p>
              <p className="text-4xl font-bold text-default-orange">{totalTicketStats.soldTicketCount}</p>
            </div>
            <div className="text-center rounded shadow-md border p-4 flex flex-col justify-center">
              <p>Ticket Sale Ratio</p>
              <p className="text-4xl font-bold text-default-orange">{Math.ceil((totalTicketStats.soldTicketCount / totalTicketStats.ticketCount) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Ticket Stats */}
        {/* <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold mb-4">Ticket Stats</h3>
          <p>Total Tickets Generated: {totalGenerated}</p>
          <p>Total Tickets Sold: {totalSold}</p>
        </div> */}

        {/* Bar Chart */}
        {/* <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold mb-4">Ticket Sales by Event</h3>
          <Bar options={options} data={barChartData} />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
