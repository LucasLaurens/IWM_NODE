let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@iwmnodetest-gbkie.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection
    .once('open', function() {
        console.log("connected")
    })
    .on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose