import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { X } from "lucide-react";

const NoteDetailsModal = ({
  note, closeModal
}) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [decryptedContent, setDecryptedContent] = useState("");

  const unlockNote = () => {
    if (!pin) {
      setError("PIN is required");
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(note.content, pin);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        setError("Incorrect PIN");
        return;
      }
      setDecryptedContent(decrypted);
      setError("");
    } catch (err) {
      setError("Error decrypting note");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">{note.title}</h3>
          <button onClick={closeModal}>
            <X size={20} className="text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        {note.isLocked && !decryptedContent ? (
          <>
            <p className="text-gray-300 mb-2">This note is locked. Enter PIN to view:</p>
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 mb-4"
            />
            <button
              onClick={unlockNote}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              Unlock Note
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-300 whitespace-pre-wrap">
              {note.isLocked ? decryptedContent : note.content}
            </p>
            <p className="text-sm text-gray-400 mt-4">Folder: {note.folder}</p>
            <p className="text-sm text-gray-400">
              Tags: {note.tags.length > 0 ? note.tags.join(", ") : "None"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetailsModal;
