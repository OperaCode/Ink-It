import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Plus, Trash2, Lock, X, Folder, Clock } from "lucide-react";
import UnlockNote from "../components/UnlockNote";
import ActivityLogSidebar from "../components/ActivityLog";
import NotesDisplay from "../components/NoteDisplay";
import NoteDetailsModal from "../components/NoteDetails";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [filterFolder, setFilterFolder] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalPin, setModalPin] = useState("");
  const [error, setError] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [logView, setLogView] = useState("Activity"); // Toggle between Activity and Folders
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  // const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const savedLog = JSON.parse(localStorage.getItem("activityLog") || "[]");
    setNotes(savedNotes);
    setActivityLog(savedLog);
  }, []);

  //   const viewNoteContent = (note) => {
  //   setSelectedNote(note);
  //   setDetailsModalOpen(true);
  // };

  const closeModal = () => {
    setSelectedNote(null);
    setDetailsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [notes, activityLog]);

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

    setNotes([newNote, ...notes]);
    setActivityLog([
      {
        id: Date.now(),
        action: `Note "${title}" added`,
        time: new Date().toLocaleTimeString(),
      },
      ...activityLog.slice(0, 9), // Keep last 10 actions
    ]);
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
    setActivityLog([
      {
        id: Date.now(),
        action: `Note "${note.title}" deleted`,
        time: new Date().toLocaleTimeString(),
      },
      ...activityLog.slice(0, 9),
    ]);
  };

  const viewNoteContent = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
    setModalPin("");
    setError("");
  };

  const unlockNote = () => {
    if (!modalPin) {
      setError("PIN is required");
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(selectedNote.content, modalPin);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        setError("Incorrect PIN");
        return;
      }
      setModalOpen(false);
      alert(decrypted);
    } catch (err) {
      setError("Error decrypting note");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-600 p-4 sm:p-6">
      {/* Header with Nav Buttons */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800/80 backdrop-blur-md shadow-lg z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-400">
          InkPulse
        </h1>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          {/* {['Home', 'Notes', 'Settings'].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="text-gray-300 px-3 py-2 rounded-lg hover:text-white hover:shadow-[0_0_5px_#a78bfa,0_0_10px_#a78bfa] transition-all duration-300"
            >
              {item}
            </Link>
          ))} */}

          {/* i want a theme toggle button here */}

          <Link
            to="/"
            className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto pt-20 sm:pt-24 flex flex-col md:flex-row gap-6">
        {/* Add Note Section */}
        <section className="md:w-2/3 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg animate-[fadeIn_0.5s_ease-out]">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Plus size={24} /> Add New Note
          </h2>
          <form onSubmit={addNote} className="space-y-4">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:scale-[1.01] transition-all duration-300"
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:scale-[1.01] transition-all duration-300"
              rows="4"
            />
            <input
              type="text"
              placeholder="Folder (optional)"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:scale-[1.01] transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:scale-[1.01] transition-all duration-300"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                className="text-purple-400 focus:ring-purple-400"
              />
              <span className="text-white text-sm sm:text-base">
                Lock Note with PIN
              </span>
            </div>
            {isLocked && (
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:scale-[1.01] transition-all duration-300"
              />
            )}
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300"
              >
                Add Note
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                  setFolder("");
                  setTags("");
                  setIsLocked(false);
                  setPin("");
                  setError("");
                }}
                className="bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-700 hover:animate-pulse transition-all duration-300"
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        {/* Activity Log Sidebar */}
        <section className="md:w-1/3 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg animate-[fadeIn_0.5s_ease-out]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              {logView === "Activity" ? (
                <Clock size={24} />
              ) : (
                <Folder size={24} />
              )}
              {logView}
            </h2>
            <button
              onClick={() =>
                setLogView(logView === "Activity" ? "Folders" : "Activity")
              }
              className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300 text-sm"
            >
              Toggle {logView === "Activity" ? "Folders" : "Activity"}
            </button>
          </div>
          {logView === "Activity" ? (
            <>
              {activityLog.length === 0 ? (
                <p className="text-gray-400 text-center italic">
                  No recent activity
                </p>
              ) : (
                <ul className="space-y-2 max-h-96 overflow-y-auto">
                  {activityLog.map((log, index) => (
                    <li
                      key={log.id}
                      className="text-gray-300 text-sm p-2 rounded-lg hover:bg-gray-700/70 transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {log.action} at {log.time}
                    </li>
                  ))}
                </ul>
              )}
              {activityLog.length > 0 && (
                <button
                  onClick={() => setActivityLog([])}
                  className="mt-4 text-red-400 text-sm hover:text-red-500 transition-all duration-300"
                >
                  Clear Log
                </button>
              )}
            </>
          ) : (
            <ul className="space-y-2">
              {uniqueFolders.map((f, index) => (
                <li
                  key={index}
                  onClick={() => setFilterFolder(f)}
                  className="text-gray-300 text-sm p-2 rounded-lg hover:bg-gray-700/70 hover:text-white cursor-pointer transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {f} ({folderCounts[f] || 0} notes)
                </li>
              ))}
            </ul>
          )}

          <ActivityLogSidebar
            logView={logView}
            setLogView={setLogView}
            activityLog={activityLog}
            setActivityLog={setActivityLog}
            uniqueFolders={uniqueFolders}
            folderCounts={folderCounts}
            setFilterFolder={setFilterFolder}
          />
        </section>
      </main>

      {/* Folder Filter */}
      <section className="max-w-7xl mx-auto mt-6">
        <select
          value={filterFolder}
          onChange={(e) => setFilterFolder(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        >
          {uniqueFolders.map((f, idx) => (
            <option key={idx} value={f}>
              {f}
            </option>
          ))}
        </select>
      </section>

      {/* Notes Display Section */}
      <section className="max-w-7xl mx-auto mt-6 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
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
              <div
                key={note.id}
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
                <p className="text-sm text-gray-400 mt-2">
                  Folder: {note.folder}
                </p>
                <p className="text-sm text-gray-400">
                  Tags: {note.tags.length > 0 ? note.tags.join(", ") : "None"}
                </p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-500 transition-all duration-300 text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            ))}
          </div>
        )} */}
        <NotesDisplay
          filteredNotes={filteredNotes}
          viewNoteContent={viewNoteContent}
          deleteNote={deleteNote}
        />
      </section>

      {/* Modal for Unlocking Notes */}
      {modalOpen && (
        // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 animate-[inkSplash_0.5s_ease-out]">
        //   <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-sm w-full">
        //     <div className="flex justify-between items-center mb-4">
        //       <h3 className="text-lg font-bold text-white">Unlock Note</h3>
        //       <button onClick={() => setModalOpen(false)}>
        //         <X size={20} className="text-gray-400 hover:text-gray-200" />
        //       </button>
        //     </div>
        //     {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        //     <input
        //       type="password"
        //       placeholder="Enter PIN"
        //       value={modalPin}
        //       onChange={(e) => setModalPin(e.target.value)}
        //       className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        //     />
        //     <button
        //       onClick={unlockNote}
        //       className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300"
        //     >
        //       Unlock
        //     </button>
        //   </div>
        // </div>
        <UnlockNote
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setModalPin={setModalPin}
          unlockNote={unlockNote}
        />
      )}

      {detailsModalOpen && selectedNote && (
        <NoteDetailsModal note={selectedNote} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
