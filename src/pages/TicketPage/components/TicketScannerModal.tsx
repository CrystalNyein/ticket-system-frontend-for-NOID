import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/SnackbarSlice';
import { SnackbarType } from '../../../constants/common';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ticketActions } from '../../../redux/actions/TicketActions';

interface TicketScannerModalProps {
  isOpen: boolean;
  action: 'scanTicket' | 'findTicket';
  onClose: () => void;
}

const TicketScannerModal: React.FC<TicketScannerModalProps> = ({ isOpen, action, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;
      setScannedCode(code);
      if (action === 'scanTicket') dispatch(ticketActions.scan(code));
      if (action === 'findTicket') dispatch(ticketActions.getDetails(code));
      onClose();
    } else {
      setScannedCode(null);
      console.log('No QR code detected');
    }
  };

  const handleError = (error: unknown) => {
    dispatch(showSnackbar({ message: 'Error scanning QR Code:' + error, type: SnackbarType.ERROR }));
    console.error('Error scanning QR code:', error);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scannerRef.current && !scannerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div ref={scannerRef} className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Scan QR Code</h2>
          <XMarkIcon onClick={onClose} className="size-8 cursor-pointer hover:bg-light-blue hover:text-white rounded p-1"></XMarkIcon>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded p-4">
            {scannedCode ? (
              <div className="flex flex-col gap-4 ">
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                  <p>
                    Scanned QR Code: <strong>{scannedCode}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{ facingMode: 'environment' }} // Use the back camera
                styles={{ container: { width: 300, height: 300 } }} // Set scanner dimensions
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketScannerModal;
