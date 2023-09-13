const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const cors = require("cors");
require('dotenv').config()

const indexRouter = require('./routes/index');
const dataConnection = require('./config/database');

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
  secret: process.env.SESSION,
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


app.use('/v1', indexRouter);

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


module.exports = app;
