var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require("path");
var multer = require('multer')
var app = express();
var port = process.env.PORT || 8085;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
})); 
var passport = require('passport');
var flash = require('connect-flash');

require('./models/passport')(passport);
require('./models/seance');

app.use(morgan('dev'));
app.use(cookieParser());

app.use('/static', express.static('assets'))
app.use('/store', express.static('store'))

app.set('view engine', 'ejs');

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);
require('./app/seance')(app,path,multer);
require('./app/Face-Analysis-route')(app,path,multer,express); 
require('./app/Raports')(app);

app.listen(port);
console.log("Port: " + port);