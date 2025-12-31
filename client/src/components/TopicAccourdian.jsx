import { ChevronDown, ChevronUp } from "lucide-react";
import api from "../services/api";

export default function TopicAccordion({
  topic,
  progress,
  isOpen,
  onToggle,
  onProgressUpdate,
}) {
  const completed = progress?.completedSubtopics || [];

  const handleCheckbox = async (index) => {
    const res = await api.post("/progress/toggle", {
      topicId: topic._id,
      subtopicIndex: index,
    });

    onProgressUpdate((prev) =>
      prev.some((p) => p.topicId === topic._id)
        ? prev.map((p) => (p.topicId === topic._id ? res.data : p))
        : [...prev, res.data]
    );
  };

  const isTopicCompleted =
    completed.length === topic.subtopics.length && topic.subtopics.length > 0;

  return (
    <div className="bg-cyan-400 rounded-lg overflow-hidden">
      {/* TOPIC HEADER */}
      <div
        onClick={onToggle}
        className="flex justify-between items-center p-4 cursor-pointer text-white"
      >
        <div className="flex items-center gap-3">
          <h2 className="font-semibold">{topic.title}</h2>

          <span
            className={`text-xs px-2 py-1 rounded ${
              isTopicCompleted ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isTopicCompleted ? "Done" : "Pending"}
          </span>
        </div>

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* SUBTOPICS */}
      {isOpen && (
        <div className="bg-white p-4">
          <h3 className="font-semibold mb-3">Sub Topics</h3>

          <div className="overflow-x-auto rounded-lg shadow-md border">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-center">LeetCode</th>
                  <th className="px-4 py-3 text-center">YouTube</th>
                  <th className="px-4 py-3 text-center">Article</th>
                  <th className="px-4 py-3 text-center">Level</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {topic.subtopics.map((sub, i) => {
                  const isCompleted = completed.includes(i);

                  return (
                    <tr
                      key={i}
                      className={`border-t transition ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50`}
                    >
                      {/* NAME */}
                      <td className="px-4 py-3 flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => handleCheckbox(i)}
                          className="accent-blue-600"
                        />
                        <span className="font-medium">{sub.title}</span>
                      </td>

                      {/* LEETCODE */}
                      <td className="px-4 py-3 text-center">
                        <a
                          href={sub.leetcode}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Practice
                        </a>
                      </td>

                      {/* YOUTUBE */}
                      <td className="px-4 py-3 text-center">
                        <a
                          href={sub.youtube}
                          target="_blank"
                          className="text-red-600 hover:underline"
                        >
                          Watch
                        </a>
                      </td>

                      {/* ARTICLE */}
                      <td className="px-4 py-3 text-center">
                        <a
                          href={sub.article}
                          target="_blank"
                          className="text-green-600 hover:underline"
                        >
                          Read
                        </a>
                      </td>

                      {/* LEVEL */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            sub.level === "EASY"
                              ? "bg-green-100 text-green-700"
                              : sub.level === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sub.level}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-yellow-400 text-black"
                          }`}
                        >
                          {isCompleted ? "Done" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
