const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // image: {type: String, required: true},
    title: {type: String,require: true,},
    releaseDate: {type: String, required: true},
    embed: {type: String, required: true},
    notes: {type: String},
    genre: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Collection', collectionSchema);