import React, { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  highSecurity?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, highSecurity = false, title, message, onConfirm, onCancel }) => {
  const [confirmText, setConfirmText] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {message && <p className="text-gray-700 mb-6">{message}</p>}
        {highSecurity && (
          <div className="py-2 mb-4">
            <h2 className="font-bold">The deleted data cannot be restored!</h2>
            <label htmlFor="confirm-delete">Please enter 'DELETE' in the textbox to confirm action.</label>
            <input
              id="confirm-delete"
              type="text"
              className="w-full py-2 px-1 border rounded outline-none"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
            />
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:cursor-not-allowed disabled:bg-red-200"
            disabled={highSecurity && confirmText !== 'DELETE'}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
