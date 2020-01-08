var db = require('../fn/db');

var config = require('../config/config');

exports.add = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].id === item.id) {
            cart[i].count += item.count;
            return;
        }
    }
    cart.push(item);
}

exports.remove = (cart, id) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (id === cart[i].id) {
            cart.splice(i, 1);
            return;
        }
    }
}