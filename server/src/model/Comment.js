const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    hotel_name: { type: String },
    comment_detail: { type: Array },
    user_name: { type: String },
    time_comment: { type: String },
    topic_id: { type: Number },
    topic_content: { type: String },
    sentiment_check: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", Comment);
