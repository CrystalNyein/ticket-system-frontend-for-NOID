import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { EventTableHeader } from '../../constants/tableHeader';
import { TEvent, TEventCreateUpdateParams } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../redux/actions/EventActions';
import { selectCurrentEvent, selectEvents } from '../../redux/selectors/EventSelector';
import EventModal from './components/EventModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setCurrentEvent } from '../../redux/slices/EventSlice';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [action, setAction] = useState<'create' | 'update'>('create');
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const currentEvent = useSelector(selectCurrentEvent);

  useEffect(() => {
    dispatch(eventActions.getList());
  }, [dispatch]);

  const handleCreateEvent = () => {
    setAction('create');
    dispatch(setCurrentEvent(null));
    setIsModalOpen(true);
  };
  const handleUpdateEvent = (event: TEvent) => {
    setAction('update');
    dispatch(setCurrentEvent(event));
    setIsModalOpen(true);
  };
  const handleDeleteEvent = (event: TEvent) => {
    dispatch(setCurrentEvent(event));
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (currentEvent) {
      dispatch(eventActions.delete(currentEvent.id));
    }
    setIsConfirmationModalOpen(false);
    dispatch(setCurrentEvent(null));
  };

  const handleSubmit = (eventData: TEventCreateUpdateParams) => {
    if (action === 'create') {
      dispatch(eventActions.create(eventData));
    } else if (action === 'update') {
      dispatch(eventActions.update(eventData));
    }
    setIsModalOpen(false);
  };
  return (
    <div className="main-content-container">
      <div className="flex justify-between">
        <p>A list of all the events created.</p>
        <button onClick={handleCreateEvent} className="bg-default-orange cursor-pointer text-white px-3 py-1.5 rounded">
          Add Event
        </button>
      </div>
      {!events || events.length === 0 ? (
        <div className="text-center py-4 font-bold">No events available</div>
      ) : (
        <Table
          data={events}
          header={EventTableHeader}
          tableRowAction={(event: TEvent) => {
            return new Date(event.startDate!) <= new Date() ? (
              <div className="flex space-x-2">
                <PencilIcon className="h-6 w-6 text-gray-500 cursor-not-allowed" title="This event has started and you will not be able to edit this event anymore." />
                <TrashIcon className="h-6 w-6 text-gray-500 cursor-not-allowed" title="This event has started and you will not be able to delete this event anymore." />
              </div>
            ) : (
              <div className="flex space-x-2">
                <PencilIcon className="h-6 w-6 cursor-pointer" onClick={() => handleUpdateEvent(event)} />
                <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" onClick={() => handleDeleteEvent(event)} />
              </div>
            );
          }}
        />
      )}

      {isModalOpen && <EventModal action={action} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete Event"
          message={`Are you sure you want to delete the event "${currentEvent?.name}"? Deleting Event will delete it's associated Tickets as well.`}
          highSecurity={true}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EventPage;
