const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('mongoose connnected');
});

mongoose.connection.on('error', (err) => {
    console.log('mongoose error ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnnected');
});