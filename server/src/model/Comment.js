const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        hotel_name: { type: String },
        comment_detail: { type: Array },
    },

    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', Comment);
