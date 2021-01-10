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
    price :{
        type:String, 
        required:false,
    }
});

module.exports = mongoose.model('product', schema);