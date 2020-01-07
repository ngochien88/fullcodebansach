var passport = require('passport');
var CustomerStrategy = require('./localStrategy');

passport.use('user', CustomerStrategy());


module.exports = passport;