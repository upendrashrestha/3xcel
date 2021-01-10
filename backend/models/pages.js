const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    keywords: {
        type: String,
        required: false,
    },
    metaDescription: {
        type: String,
        required: false,
    },
    displayPosition: { type: String, required: true },
    pageCode:{type:String, required:true}
});

module.exports = mongoose.model('page', schema);