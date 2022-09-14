const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Hotel = new Schema(
    {
        hotel_name: { type: String },
        hotel_addr: { type: String },
        hotel_price: { type: String },
        hotel_imagelink: { type: String },
        hotel_orderlink: { type: String },
    },

    {
        timestamps: true,
    },
);
Hotel.index({ hotel_name: "text"});
module.exports = mongoose.model('Hotel', Hotel);
