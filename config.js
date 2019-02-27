const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://vidoje:pass2019@ds135335.mlab.com:35335/vidoje-biblioteka';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));