const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');

const path = require('path');
const logger = require('morgan');

const app = express();
require('./database/database-schema')();
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', true);

app.use(logger('dev'));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fontawesome', express.static(
  path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')
));

app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'world, hello',
  cookie: {
    maxAge: 6 * 60 * 60 * 1000,
    secure: false
  },
  // store: sessionStore,
  rolling: true,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

module.exports = app;
