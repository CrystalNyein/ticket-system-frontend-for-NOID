import React from 'react';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-default-orange border-t-transparent rounded-full animate-spin"></div>
        <p className="text-light-orange text-center">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
