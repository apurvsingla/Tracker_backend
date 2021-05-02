const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // required: true
    },
    id: {
        type: Number
    },
}, {
    timestamps: true,
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});


const Time = mongoose.model('FastingTime', timeSchema);
module.exports = Time;