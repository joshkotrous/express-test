'use strict'

/**
 * Module dependencies.
 */

var cookieSession = require('cookie-session');
var express = require('../../');

var app = module.exports = express();

// add req.session cookie support
app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'change-me-in-production-123456789012345678901234',
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  signed: true,
  name: '__Host-session'
}));

// do something with the session
app.get('/', function (req, res) {
  req.session.count = (req.session.count || 0) + 1
  res.send('viewed ' + req.session.count + ' times\n')
})

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
