const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
    event: String,
    evaluation: String,
    emotion: String,
    alternative: String,
    alternativeEmotion: String
})

const Entry = mongoose.model('entry', entrySchema);

module.exports = {
    Entry
}