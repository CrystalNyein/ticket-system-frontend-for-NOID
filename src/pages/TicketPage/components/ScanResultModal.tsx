import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTicket } from '../../../redux/selectors/TicketSelector';
import { selectCurrentBuyer } from '../../../redux/selectors/BuyerSelector';
import { setCurrentBuyer } from '../../../redux/slices/BuyerSlice';
import { selectCurrentTicketScan } from '../../../redux/selectors/TicketScanSelector';
import moment from 'moment';
interface ScanResultModalProps {
  openScanModal: () => void;
  action: 'scanTicket' | 'findTicket';
}
const ScanResultModal: React.FC<ScanResultModalProps> = ({ openScanModal, action }) => {
  const currentTicket = useSelector(selectCurrentTicket);
  const currentBuyer = useSelector(selectCurrentBuyer);
  const currentTicketScan = useSelector(selectCurrentTicketScan);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCurrentBuyer(null));
  };
  const handleScan = () => {
    handleClose();
    openScanModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className={`rounded-lg shadow-lg w-96 p-6  ${action === 'scanTicket' ? 'text-default-orange bg-white' : 'bg-default-orange text-white'}`}>
        {currentBuyer && currentTicketScan && (
          <div className="flex flex-col gap-6 items-center">
            <h3 className={`font-bold text-2xl text-center`}>{action === 'scanTicket' ? 'Scanned Ticket' : 'Searched Ticket Details'}</h3>
            <p>
              <span className="font-bold">Buyer Name: </span>
              {currentBuyer.name}
            </p>
            <p>
              <span className="font-bold">Buyer Phone: </span>
              {currentBuyer.phone}
            </p>
            <p>
              <span className="font-bold">Ticket Code: </span>
              {currentTicket?.ticketTypeCode}
              {currentTicket?.ticketCode}
            </p>
            <p>
              <span className="font-bold">Ticket Scanned Time: </span>
              {moment(currentTicketScan.createdAt!).format('lll')}
            </p>
          </div>
        )}
        <div className="flex justify-end space-x-3 items-center mt-6">
          <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
            Close
          </button>
          <button
            className={`${action === 'scanTicket' ? 'bg-default-orange text-white' : 'bg-white text-default-orange'} hover:bg-opacity-80 px-4 py-2 rounded mx-auto`}
            onClick={handleScan}
          >
            Scan another code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanResultModal;
