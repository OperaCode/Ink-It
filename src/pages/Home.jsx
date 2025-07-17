import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import AddNoteSection from "../components/AddNotes";
import ActivityLogSidebar from "../components/ActivityLog";
import NotesDisplay from "../components/NoteDisplay";
import NoteDetailsModal from "../components/NoteDetails";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [filterFolder, setFilterFolder] = useState("All");
  const [logView, setLogView] = useState("Activity");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // 🔥 added

  // ✅ Add missing form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // load from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedLog = JSON.parse(localStorage.getItem("activityLog")) || [];
    setNotes(savedNotes);
    setActivityLog(savedLog);
    setIsLoaded(true); // ✅ mark loaded AFTER setting data
  }, []);

  // save to localStorage ONLY AFTER loading
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
    }
  }, [notes, activityLog, isLoaded]);
  

  const addNote = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    let noteContent = content;
    if (isLocked && pin) {
      noteContent = CryptoJS.AES.encrypt(content, pin).toString();
    }

    const newNote = {
      id: Date.now(),
      title,
      content: noteContent,
      folder: folder || "General",
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isLocked,
    };

    setNotes((prev) => [newNote, ...prev]);
    setActivityLog((prev) => [
      {
        id: Date.now(),
        action: `Note "${newNote.title}" added`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 9),
    ]);

    // Reset form
    setTitle("");
    setContent("");
    setFolder("");
    setTags("");
    setIsLocked(false);
    setPin("");
    setError("");
  };

  const deleteNote = (id) => {
    const note = notes.find((n) => n.id === id);
    setNotes(notes.filter((n) => n.id !== id));
    setActivityLog((prev) => [
      {
        id: Date.now(),
        action: `Note "${note.title}" deleted`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 9),
    ]);
  };

  const viewNoteContent = (note) => {
    setSelectedNote(note);
    setDetailsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setDetailsModalOpen(false);
  };

  const uniqueFolders = ["All", ...new Set(notes.map((note) => note.folder))];
  const folderCounts = uniqueFolders.reduce((acc, f) => {
    acc[f] =
      f === "All"
        ? notes.length
        : notes.filter((note) => note.folder === f).length;
    return acc;
  }, {});

  const filteredNotes =
    filterFolder === "All"
      ? notes
      : notes.filter((note) => note.folder === filterFolder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 p-4 sm:p-6">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md shadow-lg z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
          InkPulse
        </h1>
        <nav className="flex gap-4">
          <Link
            to="/"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto pt-20 sm:pt-24 flex flex-col md:flex-row gap-6">
        {/* Add Note */}
        <AddNoteSection
          addNote={addNote}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          folder={folder}
          setFolder={setFolder}
          tags={tags}
          setTags={setTags}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          pin={pin}
          setPin={setPin}
          setError={setError}
          error={error}
        />

        {/* Activity Log */}
        <ActivityLogSidebar
          logView={logView}
          setLogView={setLogView}
          activityLog={activityLog}
          setActivityLog={setActivityLog}
          uniqueFolders={uniqueFolders}
          folderCounts={folderCounts}
          setFilterFolder={setFilterFolder}
        />
      </main>

      {/* Folder Filter */}
      <section className="max-w-7xl mx-auto mt-6">
        <select
          value={filterFolder}
          onChange={(e) => setFilterFolder(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
        >
          {uniqueFolders.map((f, idx) => (
            <option key={idx} value={f}>
              {f}
            </option>
          ))}
        </select>
      </section>

      {/* Notes Display */}
      <NotesDisplay
        filteredNotes={filteredNotes}
        viewNoteContent={viewNoteContent}
        deleteNote={deleteNote}
      />

      {/* Note Details Modal */}
      {detailsModalOpen && selectedNote && (
        <NoteDetailsModal note={selectedNote} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
