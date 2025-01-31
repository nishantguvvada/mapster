'use client';

import { useState } from 'react';
import Modal from 'react-modal';

export default function ShareModal({ map, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/maps/${map?._id}?token=${map?.sharedToken}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Map</h2>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}