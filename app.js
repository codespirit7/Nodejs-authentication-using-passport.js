const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose")
const path = require('path')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express();
//Passport config
require('./config/passport')(passport);
// Db Config

const db = require('./config/keys').MongoURI;

//Connect on mongobDb
mongoose.connect((db), {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set(__dirname, 'views')
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({extended: false}))

//Express Session 
app.use(session({
  secret: 'session',
  resave: true,
  saveUninitialized: true,
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error= req.flash('error')
    next();
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on ${PORT}`))

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))