import { useEffect, useState } from 'react';
import { TDoorSaleTicketsParams, TGetResponse, TImportTicketSaleParams, TTicket, TTicketCreateParams, TTicketSummary } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../redux/actions/EventActions';
import { ticketActions } from '../../redux/actions/TicketActions';
import CreateTicketModal from './components/CreateTicketModal';
import { setCurrentTicketTemplate } from '../../redux/slices/TicketTemplateSlice';
import TicketScannerModal from './components/TicketScannerModal';
import ImportTicketSaleModal from './components/ImportTicketSalesModal';
import { ticketService } from '../../services/TicketService';
import { showSnackbar } from '../../redux/slices/SnackbarSlice';
import { SnackbarType } from '../../constants/common';
import { setLoading } from '../../redux/slices/CommonSlice';
import ScanResultModal from './components/ScanResultModal';
import { selectCurrentBuyer } from '../../redux/selectors/BuyerSelector';
import { selectCurrentTicketScan } from '../../redux/selectors/TicketScanSelector';
import DoorSaleTicketsModal from './components/DoorSaleTicketsModal';
import { selectAuthUser } from '../../redux/selectors/AuthSelector';
import { storage } from '../../constants/storage';
import { TicketSummaryTableHeader } from '../../constants/tableHeader';
import { TrashIcon } from '@heroicons/react/24/outline';
import Table from '../../components/Table';
import { selectTicketSummary } from '../../redux/selectors/TicketSelector';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { messages } from '../../constants/messages';
import DeleteTicketModal from './components/DeleteTicketModal';

const TicketPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [importSaleModalOpen, setImportSaleModalOpen] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [doorSaleTicketsModalOpen, setDoorSaleTicketsModalOpen] = useState(false);
  const [deleteTicketsModalOpen, setDeleteTicketsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<TTicketSummary>();
  const [currentAction, setCurrentAction] = useState<'scanTicket' | 'findTicket'>();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser) || JSON.parse(storage.getUser()!);
  const currentBuyer = useSelector(selectCurrentBuyer);
  const currentTicketScan = useSelector(selectCurrentTicketScan);
  const ticketSummary = useSelector(selectTicketSummary);
  useEffect(() => {
    dispatch(eventActions.getList());
    dispatch(ticketActions.getSummary());
  }, [dispatch]);
  const handleGenerateTickets = () => {
    setCreateModalOpen(true);
  };
  const handleImportTicketSales = () => {
    setImportSaleModalOpen(true);
  };
  const handleScanTicket = () => {
    setCurrentAction('scanTicket');
    setScanModalOpen(true);
  };
  const handleFindTicket = () => {
    setCurrentAction('findTicket');
    setScanModalOpen(true);
  };
  const handleDoorSale = () => {
    setDoorSaleTicketsModalOpen(true);
  };

  const handleCreateSubmit = (ticketData: TTicketCreateParams) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { file, ...rest } = ticketData;
    dispatch(ticketActions.bulkCreate(rest));
    setCreateModalOpen(false);
    dispatch(setCurrentTicketTemplate(null));
  };

  const handleSaleSubmit = async (saleData: TImportTicketSaleParams) => {
    const { file, eventId } = saleData;
    if (!file || !eventId) return alert('Please provide an Excel file and event ID.');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('eventId', eventId);
    try {
      const response: TGetResponse<TTicket> = await ticketService.importTicketSales(formData);
      dispatch(showSnackbar({ message: response.message, type: SnackbarType.SUCCESS }));
      setImportSaleModalOpen(false);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        showSnackbar({
          message: (error as Error).message,
          type: SnackbarType.ERROR,
        }),
      );
      dispatch(setLoading(false));
    }
  };
  const handleDoorSaleSubmit = async (doorSalesData: TDoorSaleTicketsParams) => {
    dispatch(ticketActions.doorSales(doorSalesData));
    setDoorSaleTicketsModalOpen(false);
  };
  const handleDeleteSelection = () => {
    setDeleteTicketsModalOpen(true);
  };
  const handleDeleteTickets = async (summary: TTicketSummary) => {
    setCurrentSummary(summary);
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (currentSummary) {
      dispatch(ticketActions.deleteByParams({ eventId: currentSummary.eventId, ticketTypeCode: currentSummary.ticketTypeCode }));
    } else {
      dispatch(showSnackbar({ message: messages.error.noTicketSummary, type: SnackbarType.ERROR }));
    }
    setCurrentSummary(undefined);
    setDeleteTicketsModalOpen(false);
    setIsConfirmationModalOpen(false);
  };
  return (
    <div className="main-content-container">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {user.role !== 'staff' && (
            <>
              <button onClick={handleGenerateTickets} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
                Generate Tickets
              </button>
              <button onClick={handleImportTicketSales} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
                Import Ticket Sales
              </button>
            </>
          )}
          <button onClick={handleScanTicket} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
            Scan Ticket
          </button>
          <button onClick={handleFindTicket} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
            Get Ticket Details
          </button>
          <button onClick={handleDoorSale} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
            Add Door Sale Tickets
          </button>
          {user.role !== 'staff' && (
            <button onClick={handleDeleteSelection} className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded">
              Delete Tickets For an Event and TicketType
            </button>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <h3 className="font-bold text-xl">Ticket Summary</h3>
        {!ticketSummary || ticketSummary.length === 0 ? (
          <div className="text-center py-4 font-bold">No ticket summary available</div>
        ) : (
          <Table
            data={ticketSummary}
            header={TicketSummaryTableHeader}
            tableRowAction={(summary: TTicketSummary) => (
              <div className="flex space-x-2">
                <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" onClick={() => handleDeleteTickets(summary)} />
              </div>
            )}
          />
        )}
      </div>
      {createModalOpen && (
        <CreateTicketModal
          isOpen={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            dispatch(setCurrentTicketTemplate(null));
          }}
          onSubmit={handleCreateSubmit}
        />
      )}

      {importSaleModalOpen && (
        <ImportTicketSaleModal
          isOpen={importSaleModalOpen}
          onClose={() => {
            setImportSaleModalOpen(false);
          }}
          onSubmit={handleSaleSubmit}
        />
      )}
      {scanModalOpen && currentAction && (
        <TicketScannerModal
          isOpen={scanModalOpen}
          action={currentAction}
          onClose={() => {
            setScanModalOpen(false);
          }}
        />
      )}
      {currentBuyer && currentTicketScan && currentAction && <ScanResultModal action={currentAction} openScanModal={() => setScanModalOpen(true)} />}
      {doorSaleTicketsModalOpen && (
        <DoorSaleTicketsModal
          isOpen={doorSaleTicketsModalOpen}
          onClose={() => {
            setDoorSaleTicketsModalOpen(false);
          }}
          onSubmit={handleDoorSaleSubmit}
        />
      )}
      {deleteTicketsModalOpen && (
        <DeleteTicketModal
          isOpen={deleteTicketsModalOpen}
          onClose={() => {
            setDeleteTicketsModalOpen(false);
            setCurrentSummary(undefined);
          }}
          onSubmit={handleDeleteTickets}
        />
      )}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete Tickets"
          message={`Are you sure you want to delete the tickets for the event "${currentSummary?.eventName}" with the code "${currentSummary?.ticketTypeCode}"?`}
          highSecurity={true}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketPage;
