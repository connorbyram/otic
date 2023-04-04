const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    url: {type: String, required: true},
    title: String
  }, {
    timestamps: true,
  });

const collectionSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    releaseDate: {type: Date, required: true},
    embed: {type: String},
    notes: {type: String},
    genre: {type: String, required: true},
    agreement: {type: Boolean, default: false},
    tracks: [trackSchema],
    publish: {type: Boolean, default: false}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Collection', collectionSchema);