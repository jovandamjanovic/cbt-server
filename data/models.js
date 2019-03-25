const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const entrySchema = new Schema({
    creator: String,
    dateTime: Date,
    event: String,
    evaluation: String,
    emotion: String,
    alternative: String,
    alternativeEmotion: String
})

const Entry = mongoose.model('entry', entrySchema);
const User = mongoose.model('user', userSchema);

console.log('registering models from schema');

module.exports = {
    Entry,
    User
}