var passportLocal = require('passport-local');
var SHA256 = require('crypto-js/sha256')

var userRepo = require('../repos/userRepo');

const CustomerStrategyConfig = () => {
    const { Strategy: LocalStrategy } = passportLocal;

    const localOptions = {
        "usernameField": "username",
        "passwordField": "password"
    };

    return new LocalStrategy(localOptions,
        (username, password, done) => {
            let user = {
                username,
                password: SHA256(password).toString()
            };
            console.log('herer')
            return userRepo.loginCustomer(user)
                .then(rows => {
                    return rows.length > 0
                        ? done(null, rows[0])
                        : done(null, false);
                });
        });
};

module.exports = CustomerStrategyConfig;
