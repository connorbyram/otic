const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    url: {type: String, required: true},
    title: String
  }, {
    timestamps: true,
  });

  module.exports = mongoose.model('Track', trackSchema);