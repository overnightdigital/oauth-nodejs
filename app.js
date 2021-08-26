const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./conf/passport')(passport);

// Mongo & Template Setup
var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine','ejs');

// Middleware & DB for Sessions Setup
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
  )
  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Use Routes
app.use(require("./routes/index"))
app.use(require('./routes/auth'))

app.listen(PORT,console.log(`listening at ${PORT}`))