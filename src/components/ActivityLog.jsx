import React from "react";
import { Clock, Folder } from "lucide-react";

const ActivityLogSidebar = ({
  logView, setLogView, activityLog, setActivityLog,
  uniqueFolders, folderCounts, setFilterFolder
}) => (
  <section className="md:w-1/3 bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg animate-[fadeIn_0.5s_ease-out]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
        {logView === "Activity" ? <Clock size={24} /> : <Folder size={24} />}
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
  </section>
);

export default ActivityLogSidebar;
