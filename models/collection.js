const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema ({
    title: {type: String, required: true},
    url: {type: String, required: true},
    number: {type: Number, require: true},
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
    embed: {type: String, required: true},
    notes: {type: String},
    genre: {
        type: String,
        required: true
    },
    agreement: {type: Boolean, default: false},
    audio: [trackSchema],

}, {
    timestamps: true,
});

module.exports = mongoose.model('Collection', collectionSchema);