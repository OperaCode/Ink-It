import React from "react";
import NoteCard from "./NoteCard";

const NotesDisplay = ({ filteredNotes, viewNoteContent, deleteNote }) => (
  <section className="max-w-7xl mx-auto mt-6 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
      Your Notes
    </h2>
    {filteredNotes.length === 0 ? (
      <div className="text-center py-12 text-gray-200 animate-[fadeIn_0.5s_ease-out]">
        <p className="mb-4">No notes in this folder.</p>
        <p className="italic">Start capturing your ideas ✨</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredNotes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            viewNoteContent={viewNoteContent}
            deleteNote={deleteNote}
            index={index}
          />
        ))}
      </div>
    )}
  </section>
);

export default NotesDisplay;
