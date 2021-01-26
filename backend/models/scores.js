const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('score', schema);