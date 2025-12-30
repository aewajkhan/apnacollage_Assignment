import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: String,
  subtopics: [
    {
      title: String,
      leetcode: String,
      youtube: String,
      article: String,
      level: String
    }
  ]
});

export default mongoose.model("Topic", topicSchema);
