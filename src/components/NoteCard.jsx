import React from "react";
import { Lock, Trash2 } from "lucide-react";

const NoteCard = ({ note, viewNoteContent, deleteNote, index }) => (
  <div
    className="bg-gray-700/70 p-4 rounded-lg shadow-md hover:shadow-[0_0_5px_#a78bfa] hover:scale-[1.02] transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 flex items-center gap-2">
      {note.title} {note.isLocked && <Lock size={18} />}
    </h3>
    <p className="text-gray-300 text-sm sm:text-base line-clamp-2">
      {note.isLocked ? "🔒 Locked" : note.content}
    </p>
    {note.isLocked && (
      <button
        onClick={() => viewNoteContent(note)}
        className="text-blue-400 text-sm mt-2 hover:text-blue-500 transition-all duration-300"
      >
        Unlock
      </button>
    )}
    <p className="text-sm text-gray-400 mt-2">Folder: {note.folder}</p>
    <p className="text-sm text-gray-400">
      Tags: {note.tags.length > 0 ? note.tags.join(", ") : "None"}
    </p>
   <button
      onClick={(e) => {
        e.stopPropagation();
        deleteNote(note.id);
      }}
      className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-500 transition-all duration-300 text-sm"
    >
      <Trash2 size={16} /> Delete
    </button>
  </div>
);

export default NoteCard;
