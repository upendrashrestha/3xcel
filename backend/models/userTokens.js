const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserTokensSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("userTokens", UserTokensSchema);