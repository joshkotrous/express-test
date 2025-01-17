'use strict'

// install redis first:
// https://redis.io/

// then:
// $ npm install redis
// $ redis-server

var express = require('../..');
var session = require('express-session');
var crypto = require('crypto');
var app = express();

secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  cookie: {
    secure: true, // Ensure cookies are only sent over HTTPS
    httpOnly: true, // Prevent client-side access to cookies
    sameSite: 'strict', // Protect against CSRF
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  },
  name: 'sessionId', // Change default session cookie name
  rolling: true // Refresh session with each request
if (app.get('env') === 'production' && !process.env.SESSION_SECRET) {
  console.error('WARNING: SESSION_SECRET not set in production environment');
}
const secret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

secret: secret
  var body = '';
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});
var body = '';
/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
