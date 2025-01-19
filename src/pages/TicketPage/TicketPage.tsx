import { useEffect, useState } from "react";
import {
  TGetResponse,
  TImportTicketSaleParams,
  TTicket,
  TTicketCreateParams,
} from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../redux/actions/EventActions";
import { ticketActions } from "../../redux/actions/TicketActions";
import CreateTicketModal from "./components/CreateTicketModal";
import { setCurrentTemplate } from "../../redux/slices/TicketTemplateSlice";
import TicketScannerModal from "./components/TicketScannerModal";
import ImportTicketSaleModal from "./components/ImportTicketSalesModal";
import { ticketService } from "../../services/TicketService";
import { showSnackbar } from "../../redux/slices/SnackbarSlice";
import { SnackbarType } from "../../constants/common";
import { setLoading } from "../../redux/slices/CommonSlice";
import ScanResultModal from "./components/ScanResultModal";
import { selectCurrentBuyer } from "../../redux/selectors/BuyerSelector";
// import TicketScannerModal from './components/TicketScannerModal';

const TicketPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [importSaleModalOpen, setImportSaleModalOpen] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentBuyer = useSelector(selectCurrentBuyer);
  useEffect(() => {
    dispatch(eventActions.getList());
  }, [dispatch]);
  const handleGenerateTickets = () => {
    setCreateModalOpen(true);
  };
  const handleImportTicketSales = () => {
    setImportSaleModalOpen(true);
  };
  const handleScanTicket = () => {
    setScanModalOpen(true);
  };

  const handleCreateSubmit = (ticketData: TTicketCreateParams) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { file, ...rest } = ticketData;
    dispatch(ticketActions.bulkCreate(rest));
    setCreateModalOpen(false);
    dispatch(setCurrentTemplate(null));
  };

  const handleSaleSubmit = async (saleData: TImportTicketSaleParams) => {
    const { file, eventId } = saleData;
    if (!file || !eventId)
      return alert("Please provide an Excel file and event ID.");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventId", eventId);
    try {
      const response: TGetResponse<TTicket> =
        await ticketService.importTicketSales(formData);
      dispatch(
        showSnackbar({ message: response.message, type: SnackbarType.SUCCESS })
      );
      setImportSaleModalOpen(false);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        showSnackbar({
          message: (error as Error).message,
          type: SnackbarType.ERROR,
        })
      );
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="main-content-container">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <button
            onClick={handleGenerateTickets}
            className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded"
          >
            Generate Tickets
          </button>
          <button
            onClick={handleImportTicketSales}
            className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded"
          >
            Import Ticket Sales
          </button>
          <button
            onClick={handleScanTicket}
            className="bg-default-orange hover:bg-opacity-90 cursor-pointer text-white px-3 py-1.5 rounded"
          >
            Scan Ticket
          </button>
        </div>
      </div>
      {createModalOpen && (
        <CreateTicketModal
          isOpen={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            dispatch(setCurrentTemplate(null));
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
      {scanModalOpen && (
        <TicketScannerModal
          isOpen={scanModalOpen}
          onClose={() => {
            setScanModalOpen(false);
          }}
        />
      )}
      {currentBuyer && (
        <ScanResultModal openScanModal={() => setScanModalOpen(true)} />
      )}
      {/* {!events || events.length === 0 ? (
        <div className="text-center py-4 font-bold">No events available</div>
      ) : (
        <Table
          data={events}
          header={EventTableHeader}
          tableRowAction={(event: TEvent) => (
            <div className="flex space-x-2">
              <PencilIcon className="h-6 w-6 cursor-pointer" onClick={() => handleUpdateEvent(event)} />
              <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" onClick={() => handleDeleteEvent(event)} /> 
            </div>
          )}
        />
      )} */}

      {/* {isModalOpen && <EventModal action={action} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete Event"
          message={`Are you sure you want to delete the event "${currentEvent?.name}"`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )} */}
    </div>
  );
};

export default TicketPage;
