import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTicket } from '../../../redux/selectors/TicketSelector';
import { selectCurrentBuyer } from '../../../redux/selectors/BuyerSelector';
import { setCurrentBuyer } from '../../../redux/slices/BuyerSlice';
import { selectCurrentTicketScan } from '../../../redux/selectors/TicketScanSelector';
import moment from 'moment';
interface ScanResultModalProps {
  openScanModal: () => void;
}
const ScanResultModal: React.FC<ScanResultModalProps> = ({ openScanModal }) => {
  const currentTicket = useSelector(selectCurrentTicket);
  const currentBuyer = useSelector(selectCurrentBuyer);
  const currentTicketScan = useSelector(selectCurrentTicketScan);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCurrentBuyer(null));
    openScanModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {currentBuyer && currentTicketScan && (
          <div className="flex flex-col gap-6 items-center">
            <h3 className="font-bold text-xl text-center text-default-orange">Ticket Details</h3>
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
        <button className="bg-default-orange text-white hover:bg-opacity-80 px-4 py-2 rounded mx-auto w-full mt-6" onClick={handleClose}>
          Scan another code
        </button>
      </div>
    </div>
  );
};

export default ScanResultModal;
