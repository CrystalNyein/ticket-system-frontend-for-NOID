import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { TTicketTemplate } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { ticketTemplateActions } from '../../redux/actions/TicketTemplateActions';
import { selectCurrentTicketTemplate, selectTicketTemplates } from '../../redux/selectors/TicketTemplateSelector';
import { TrashIcon } from '@heroicons/react/24/outline';
import { setCurrentTicketTemplate } from '../../redux/slices/TicketTemplateSlice';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import UploadTicketTemplateModal from './components/UploadTicketTemplateModal';
import { TicketTemplateTableHeader } from '../../constants/tableHeader';

const TicketTemplatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const ticketTemplates = useSelector(selectTicketTemplates);
  const currentTicketTemplate = useSelector(selectCurrentTicketTemplate);

  useEffect(() => {
    dispatch(ticketTemplateActions.getList());
  }, [dispatch]);

  const handleCreateTicketTemplate = () => {
    dispatch(setCurrentTicketTemplate(null));
    setIsModalOpen(true);
  };
  const handleDeleteTicketTemplate = (ticketTemplate: TTicketTemplate) => {
    dispatch(setCurrentTicketTemplate(ticketTemplate));
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (currentTicketTemplate) {
      dispatch(ticketTemplateActions.delete(currentTicketTemplate.id));
    }
    setIsConfirmationModalOpen(false);
    dispatch(setCurrentTicketTemplate(null));
  };

  return (
    <div className="main-content-container">
      <div className="flex justify-between gap-4">
        <p>A list of all the Ticket Templates created.</p>
        <button onClick={handleCreateTicketTemplate} className="bg-default-orange cursor-pointer text-white px-3 py-1.5 rounded">
          Add Ticket Template
        </button>
      </div>
      {!ticketTemplates || ticketTemplates.length === 0 ? (
        <div className="text-center py-4 font-bold">No Ticket Templates available</div>
      ) : (
        <Table
          data={ticketTemplates}
          header={TicketTemplateTableHeader}
          tableRowAction={(ticketTemplate: TTicketTemplate) => {
            return (
              <div className="flex space-x-2">
                <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" onClick={() => handleDeleteTicketTemplate(ticketTemplate)} />
              </div>
            );
          }}
        />
      )}

      {isModalOpen && <UploadTicketTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete Ticket Template"
          message={`Are you sure you want to delete the Ticket Template for Ticket Code - "${currentTicketTemplate?.ticketTypeCode}", Event - "${currentTicketTemplate?.event?.name}"`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketTemplatePage;
