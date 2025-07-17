import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white">Ink-It Dashboard</h1>
        <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
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
              className="w-full px-4 py-2 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Add Note
            </button>
          </form>
        </section>

        {/* Notes Display Section */}
        <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Your Notes</h2>
          {notes.length === 0 ? (
            <div className="text-center py-12 text-gray-200">
              <p className="mb-4">No notes yet.</p>
              <p className="italic">Start capturing your ideas ✨</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition transform hover:scale-[1.02]"
                >
                  <h3 className="text-xl font-bold text-purple-600 mb-2">{note.title}</h3>
                  <p className="text-gray-700">{note.content}</p>
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
}

export default Home;
