const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('service', schema);