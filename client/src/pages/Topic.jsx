

import { useEffect, useState } from "react";
import api from "../services/api";
import TopicAccordion from "../components/TopicAccourdian";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/topics"),
      api.get("/progress/user")
    ]).then(([tRes, pRes]) => {
      setTopics(tRes.data);
      setProgress(pRes.data);
    });
  }, []);


console.log("Fetched Topics:", topics);
console.log("Fetched Progress:", progress);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {topics?.data?.map(topic => {
        const topicProgress = progress.find(
          p => p.topicId === topic._id
        );

        return (
          <TopicAccordion
            key={topic._id}
            topic={topic}
            progress={topicProgress}
            isOpen={openId === topic._id}
            onToggle={() =>
              setOpenId(openId === topic._id ? null : topic._id)
            }
            onProgressUpdate={setProgress}
          />
        );
      })}
    </div>
  );
}
