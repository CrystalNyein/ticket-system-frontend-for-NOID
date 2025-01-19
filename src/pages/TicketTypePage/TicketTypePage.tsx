import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { TicketTypeTableHeader } from '../../constants/tableHeader';
import { TTicketType, TTicketTypeCreateUpdateParams } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { ticketTypeActions } from '../../redux/actions/TicketTypeActions';
import { selectLoading } from '../../redux/selectors/CommonSelector';
import { selectCurrentTicketType, selectTicketTypes } from '../../redux/selectors/TicketTypeSelector';
// import TicketTypeModal from './components/TicketTypeModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setCurrentTicketType } from '../../redux/slices/TicketTypeSlice';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import TicketTypeModal from './components/TicketTypeModal';

const TicketTypePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [action, setAction] = useState<'create' | 'update'>('create');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const ticketTypes = useSelector(selectTicketTypes);
  const currentTicketType = useSelector(selectCurrentTicketType);

  useEffect(() => {
    dispatch(ticketTypeActions.getList());
  }, [dispatch]);

  const handleCreateTicketType = () => {
    setAction('create');
    dispatch(setCurrentTicketType(null));
    setIsModalOpen(true);
  };
  const handleUpdateTicketType = (ticketType: TTicketType) => {
    setAction('update');
    dispatch(setCurrentTicketType(ticketType));
    setIsModalOpen(true);
  };
  const handleDeleteTicketType = (ticketType: TTicketType) => {
    dispatch(setCurrentTicketType(ticketType));
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (currentTicketType) {
      dispatch(ticketTypeActions.delete(currentTicketType.id));
    }
    setIsConfirmationModalOpen(false);
    dispatch(setCurrentTicketType(null));
  };

  const handleSubmit = (ticketTypeData: TTicketTypeCreateUpdateParams) => {
    if (action === 'create') {
      dispatch(ticketTypeActions.create(ticketTypeData));
    } else if (action === 'update') {
      dispatch(ticketTypeActions.update(ticketTypeData));
    }
    setIsModalOpen(false);
  };
  if (loading) {
    return <div className="text-center">Loading ticketTypes...</div>;
  }
  return (
    <div className="main-content-container">
      <div className="flex justify-between">
        <p>A list of all the Ticket Types created.</p>
        <button onClick={handleCreateTicketType} className="bg-default-orange cursor-pointer text-white px-3 py-1.5 rounded">
          Add TicketType
        </button>
      </div>
      {!ticketTypes || ticketTypes.length === 0 ? (
        <div className="text-center py-4 font-bold">No ticketTypes available</div>
      ) : (
        <Table
          data={ticketTypes}
          header={TicketTypeTableHeader}
          tableRowAction={(ticketType: TTicketType) => (
            <div className="flex space-x-2">
              <PencilIcon className="h-6 w-6 cursor-pointer" onClick={() => handleUpdateTicketType(ticketType)} />
              <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" onClick={() => handleDeleteTicketType(ticketType)} />
            </div>
          )}
        />
      )}

      {isModalOpen && <TicketTypeModal action={action} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete TicketType"
          message={`Are you sure you want to delete the ticketType "${currentTicketType?.name}"`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketTypePage;
