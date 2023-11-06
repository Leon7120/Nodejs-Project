const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const app = express();
const cors = require("cors");
require('dotenv').config()

const loginRouter = require('./routes/login');
const pizzaRouter = require('./routes/pizza');

const MySQLStore = require('express-mysql-session')(session);
const dataConnection = require('./config/database');
const passport = require('passport');
const flash = require("connect-flash");

// const RedisStore = require('connect-redis').default;
// const { createClient } = require('redis');

// // Initialize client.
// let redisClient = createClient();
// redisClient.connect().catch(console.error);

// // Initialize store.
// let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: 'myapp:',
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  method: ["GET", "POST"],
  Credential: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MySQLStore({
  clearExpired: true,
  expiration: 86400000,
  createDatabaseTable: true,
  connectionLimit: 50,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}/* session store options */, dataConnection);

app.use(session({
  secret: process.env.NODE_SESSION_SECRETKEY,
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 1 }/* milliseconds,seconds,minutes,hours */
}));

app.use(passport.initialize());
// app.use(passport.session());

app.use(flash());
app.use('/v1', loginRouter);
app.use('/v1', pizzaRouter);


// //catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//redirect all invalid url to home page
app.use(function (req, res) {
  res.redirect('/v1')
});


module.exports = app;
