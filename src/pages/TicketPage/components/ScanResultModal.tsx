import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTicket } from '../../../redux/selectors/TicketSelector';
import { selectCurrentBuyer } from '../../../redux/selectors/BuyerSelector';
import { setCurrentBuyer } from '../../../redux/slices/BuyerSlice';
interface ScanResultModalProps {
  openScanModal: () => void;
}
const ScanResultModal: React.FC<ScanResultModalProps> = ({ openScanModal }) => {
  const currentTicket = useSelector(selectCurrentTicket);
  const currentBuyer = useSelector(selectCurrentBuyer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCurrentBuyer(null));
    openScanModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {currentBuyer && (
          <div className="flex flex-col gap-8">
            <p>Buyer Name: {currentBuyer.name}</p>
            <p>Buyer Phone: {currentBuyer.phone}</p>
            <p>
              Ticket Code: {currentTicket?.ticketTypeCode}
              {currentTicket?.ticketCode}
            </p>
          </div>
        )}
        <button className="bg-dark-blue text-white hover:bg-opacity-80 px-4 py-2 rounded mx-auto" onClick={handleClose}>
          Scan another code
        </button>
      </div>
    </div>
  );
};

export default ScanResultModal;
