// require necessary NPM packagaes
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// require route files
const users = require('./routes/api/users');

// require database config
// `db` will be the actual Mongo URI as a string
const db = require('./config/keys').mongoURI;

// establish database connection
// user new version of URL parser 
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

// instantiate express application object
const app = express();

// set up middlewares
// bodyParser parses request bodies before handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// authenticate endpoints using json web token
app.use(passport.initialize());
// require a function that takes passport as parameter 
// and construct the JWT authentication strategy 
require('./config/passport')(passport);

// register routes
app.use('/api/users', users);

// define port for API to run on
const port = process.env.PORT || 5000;

// run API on designated port
app.listen(port, () => console.log(`Server running on port ${port}`));