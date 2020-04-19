var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

mongoose.connect(process.env.mongoDB, (...args) => {
});


var app = express();

app.use(cors());

var server = require('http').Server(app);
var io = require('socket.io')(server);
var users = {};
io.on('connection', (socket) => {
  socket.on('changeId', (mobileNumber) => {
    users[mobileNumber] = socket.id;
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/auth'));

require('./routes/login.js')(app);
require('./routes/signup.js')(app);
require('./routes/friend-request')(app);
require('./routes/accept-request')(app);
require('./routes/get-details')(app);
require('./routes/find-friend')(app);
require('./routes/message')(app, io, users);

// app.use('/signup', require('./routes/signup.js'));
// app.use('/auth/friendRequest', require('./routes/friend-request'));
// app.use('/auth/acceptRequest', require('./routes/accept-request'));
// app.use('/auth/getDetails', require('./routes/get-details'));
// app.use('/auth/message', require('./routes/message'));
// app.use('/auth/findFriend', require('./routes/find-friend'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
