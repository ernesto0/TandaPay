const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const tanda = require('./routes/api/tanda');
const tan = require('./models/Tanda');
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/tanda', tanda);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

const invite = {
    user : '5c69ded012796930b873b261',
    status: 'invited'
}
const code = {
    code : 'abc',
    email : 'ernesto.taylor0@gmail.com'
}
const t = new tan({
    name: 'test3',
    secretary: '5c69ded012796930b873b261',
    invited: [invite],
    registrationCodes : [{code: 'abc', email: 'ernesto.taylor0@gmail.com'}]

});
// t.save();