'use strict'

/**
 * Module dependencies.
 */

var crypto = require('crypto');
var logger = require('morgan');
var session = require('express-session');

// pass the express to the connect redis module
// allowing it to inherit from session.Store
var RedisStore = require('connect-redis')(session);

var app = express();

app.use(logger('dev'));

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  store: new RedisStore,
sameSite: 'strict',
    httpOnly: true,
    secure: true,
    domain: process.env.COOKIE_DOMAIN || undefined
sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
    sameSite: 'strict'
  }
}));

app.get('/', function(req, res){
  var body = '';
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});

app.listen(3000);
console.log('Express app started on port 3000');