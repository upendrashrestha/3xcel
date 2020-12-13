const mongoose = require('mongoose');

const schema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('question', schema);