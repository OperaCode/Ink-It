import React from "react";
import { Plus } from "lucide-react";

const AddNoteForm = ({
  addNote, title, setTitle, content, setContent, folder, setFolder,
  tags, setTags, isLocked, setIsLocked, pin, setPin, setError, error
}) => (
  <section className="md:w-2/3 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg animate-[fadeIn_0.5s_ease-out]">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
      <Plus size={24} /> Add New Note
    </h2>
    <form onSubmit={addNote} className="space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Title input */}
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-cyan-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] transition duration-300"
      />

      {/* Content textarea */}
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-cyan-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] transition duration-300"
        rows="4"
      />

      {/* Folder input */}
      <input
        type="text"
        placeholder="Folder (optional)"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-cyan-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] transition duration-300"
      />

      {/* Tags input */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-cyan-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] transition duration-300"
      />

      {/* Lock Note */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isLocked}
          onChange={(e) => setIsLocked(e.target.checked)}
          className="text-cyan-400 focus:ring-cyan-400"
        />
        <span className="text-white text-sm sm:text-base">
          Lock Note with PIN
        </span>
      </div>

      {/* PIN input if locked */}
      {isLocked && (
        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-cyan-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] transition duration-300"
        />
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-cyan-700 hover:animate-pulse transition duration-300"
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
          className="bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-700 hover:animate-pulse transition duration-300"
        >
          Clear
        </button>
      </div>
    </form>
  </section>
);

export default AddNoteForm;
