import Progress from "../models/Progress.js";
import Topic from "../models/Topic.js";

export const getUserProgress = async (req, res) => {
  const userId = req.user.id;

  const topics = await Topic.find();
  const progress = await Progress.find({ userId });

  let totalSubtopics = 0;
  let completed = 0;

  topics.forEach(topic => {
    totalSubtopics += topic.subtopics.length;

    const p = progress.find(
      pr => pr.topicId.toString() === topic._id.toString()
    );
    if (p) completed += p.completedSubtopics;
  });

  const percentage = totalSubtopics
    ? Math.round((completed / totalSubtopics) * 100)
    : 0;

  res.json({
    success: true,
    completed,
    totalSubtopics,
    percentage
  });
};


// import Progress from "../models/Progress.js";

export const markSubtopicComplete = async (req, res) => {
  const { topicId, subtopicIndex } = req.body;
  const userId = req.user.id;

  let progress = await Progress.findOne({ userId, topicId });

  if (!progress) {
    progress = await Progress.create({
      userId,
      topicId,
      completedSubtopics: [subtopicIndex]
    });
  } else {
    if (!progress.completedSubtopics.includes(subtopicIndex)) {
      progress.completedSubtopics.push(subtopicIndex);
      await progress.save();
    }
  }

  res.json({
    success: true,
    completedSubtopics: progress.completedSubtopics
  });
};
