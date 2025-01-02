import Table from '../components/Table';
import { EventTableHeader } from '../constants/tableHeader';
import { TEventCreateUpdateParams } from '../constants/types';

const EventPage = () => {
  const eventData: TEventCreateUpdateParams[] = [
    {
      name: 'Event A',
      description: 'Description for Event A',
      start_date: '2025-01-15',
      end_date: '2025-01-16',
    },
    {
      name: 'Event B',
      description: 'Description for Event B',
      start_date: '2025-02-10',
      end_date: '2025-02-12',
    },
  ];
  return (
    <div className="main-content-container">
      <Table data={eventData} header={EventTableHeader} />
    </div>
  );
};

export default EventPage;
