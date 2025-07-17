import React from "react";
import { X } from "lucide-react";

const UnlockNoteModal = ({
  modalOpen, setModalOpen, modalPin, setModalPin, unlockNote, error
}) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 animate-[inkSplash_0.5s_ease-out]">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Unlock Note</h3>
          <button onClick={() => setModalOpen(false)}>
            <X size={20} className="text-gray-400 hover:text-gray-200" />
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          type="password"
          placeholder="Enter PIN"
          value={modalPin}
          onChange={(e) => setModalPin(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        />
        <button
          onClick={unlockNote}
          className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300"
        >
          Unlock
        </button>
      </div>
    </div>
  );
};

export default UnlockNoteModal;
