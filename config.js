const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://jovandamjanovic:cbtpassword2019@ds155845.mlab.com:55845/cbt-data';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));