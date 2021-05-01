const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    week:{
        type: String
    },
    month: {
        type: String,
    },
    year: {
        type: String
    }
}, {
    timestamps: true,
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});


const Value = mongoose.model('Value', valueSchema);
module.exports = Value;