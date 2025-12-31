import Progress from "../models/Progress.js";
import Topic from "../models/Topic.js";

export const markSubtopicComplete = async (req, res) => {
  const { topicId, subtopicIndex } = req.body;
  const userId = req.user.id;

  let progress = await Progress.findOne({ userId, topicId });

  if (!progress) {
    progress = new Progress({
      userId,
      topicId,
      completedSubtopics: [],
    });
  }

  if (progress.completedSubtopics.includes(subtopicIndex)) {
    progress.completedSubtopics = progress.completedSubtopics.filter(
      (i) => i !== subtopicIndex
    );
  } else {
    progress.completedSubtopics.push(subtopicIndex);
  }

  await progress.save();
  res.json(progress);
};

export const getUserLevels = async (req, res) => {
  const topics = await Topic.find();
  const progress = await Progress.find({ userId: req.user.id });

  const levels = {
    EASY: { total: 0, completed: 0, weight: 1 },
    MEDIUM: { total: 0, completed: 0, weight: 2 },
    HARD: { total: 0, completed: 0, weight: 3 },
  };

  topics.forEach((topic) => {
    const userProgress = progress.find(
      (p) => p.topicId.toString() === topic._id.toString()
    );

    topic.subtopics.forEach((sub, index) => {
      levels[sub.level].total++;

      if (userProgress?.completedSubtopics.includes(index)) {
        levels[sub.level].completed++;
      }
    });
  });

  const levelPercentages = {};
  let totalPoints = 0;
  let earnedPoints = 0;

  Object.keys(levels).forEach((level) => {
    const { total, completed, weight } = levels[level];

    levelPercentages[level] = total ? Math.round((completed / total) * 100) : 0;

    totalPoints += total * weight;
    earnedPoints += completed * weight;
  });

  res.json({
    levels: levelPercentages,
    overall: totalPoints ? Math.round((earnedPoints / totalPoints) * 100) : 0,
  });
};
