const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Source = new Schema(
    {
        source_id: { type: String },
        source_name: { type: String },
        hotel_id: { type: String },
        hotel_price: { type: String },
        hotel_imagelink: { type: String },
        hotel_orderlink: { type: String },
    },

    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Source', Source);
