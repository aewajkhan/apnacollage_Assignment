import Topic from "../models/Topic.js";

export const getTopics = async (req, res) => {
  const topics = await Topic.find();
  res.json({ success: true, data: topics });
};
