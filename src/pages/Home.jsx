import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Plus, Trash2, Lock } from "lucide-react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [filterFolder, setFilterFolder] = useState("All");

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    let noteContent = content;

    if (isLocked && pin) {
      noteContent = CryptoJS.AES.encrypt(content, pin).toString();
    }

    const newNote = {
      id: Date.now(),
      title,
      content: noteContent,
      folder: folder || "General",
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      isLocked,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setFolder("");
    setTags("");
    setIsLocked(false);
    setPin("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const viewNoteContent = (note) => {
    if (!note.isLocked) return note.content;

    const userPin = prompt("Enter PIN to unlock this note:");
    try {
      const bytes = CryptoJS.AES.decrypt(note.content, userPin);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        alert("Incorrect PIN");
        return "🔒 Locked";
      }
      return decrypted;
    } catch (err) {
      alert("Error decrypting note");
      return "🔒 Locked";
    }
  };

  const uniqueFolders = ["All", ...new Set(notes.map((note) => note.folder))];

  const filteredNotes =
    filterFolder === "All"
      ? notes
      : notes.filter((note) => note.folder === filterFolder);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white">Ink-It Dashboard</h1>
        <Link
          to="/"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </Link>
      </header>

      <main className="max-w-3xl mx-auto">
        {/* Add Note Section */}
        <section className="mb-12 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Plus size={24} /> Add New Note
          </h2>
          <form onSubmit={addNote} className="space-y-4">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Folder (optional)"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
              />
              <span className="text-white">Lock Note with PIN</span>
            </div>

            {isLocked && (
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Add Note
            </button>
          </form>
        </section>

        {/* Folder Filter */}
        <section className="mb-6">
          <select
            value={filterFolder}
            onChange={(e) => setFilterFolder(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {uniqueFolders.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
        </section>

        {/* Notes Display Section */}
        <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Your Notes</h2>
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-gray-200">
              <p className="mb-4">No notes in this folder.</p>
              <p className="italic">Start capturing your ideas ✨</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition transform hover:scale-[1.02]"
                >
                  <h3 className="text-xl font-bold text-purple-600 mb-2 flex items-center gap-2">
                    {note.title} {note.isLocked && <Lock size={18} />}
                  </h3>
                  <p className="text-gray-700">
                    {note.isLocked ? "🔒 Locked" : note.content}
                  </p>

                  {note.isLocked && (
                    <button
                      onClick={() => {
                        const unlocked = viewNoteContent(note);
                        if (unlocked !== "🔒 Locked") {
                          alert(unlocked);
                        }
                      }}
                      className="text-blue-500 text-sm mt-2"
                    >
                      Unlock
                    </button>
                  )}

                  <p className="text-sm text-gray-500 mt-2">
                    Folder: {note.folder}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tags: {note.tags.length > 0 ? note.tags.join(", ") : "None"}
                  </p>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 transition text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
