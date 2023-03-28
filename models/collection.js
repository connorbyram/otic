const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    releaseDate: {type: String, required: true},
    embed: {type: String, required: true},
    notes: {type: String},
    genre: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Collection', collectionSchema);