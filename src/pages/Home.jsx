import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">MyApp Dashboard</h1>
        <Link to="/" className="text-blue-600 underline">
          Logout
        </Link>
      </header>

      <main className="max-w-lg mx-auto">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Note</h2>
          <form onSubmit={addNote} className="space-y-2">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Note
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Your Notes</h2>
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border p-3 rounded bg-white shadow"
                >
                  <h3 className="font-bold">{note.title}</h3>
                  <p>{note.content}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Delete
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

export default Home
