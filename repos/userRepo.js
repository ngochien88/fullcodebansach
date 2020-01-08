
var db = require('../fn/db');
var moment = require('moment'),
    SHA256 = require('crypto-js/sha256');

var config = require('../config/config');

exports.loadAll = () => {
    var sql = "select * from users";
    return db.load(sql);
}

exports.add = (c) => {
    var temp = 0;
    if (c.checkbox === '')
        temp = 1;
    c.dob = moment(c.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    var password = SHA256(c.cmnd).toString();
    var sql = `insert into users(Username, Password, Fullname, CMND, DOB, Sex, Address, Phone, Email, Permission, Actived) 
    values('${c.username}', '${password}', '${c.fullname}', '${c.cmnd}', '${c.dob}', '${c.sex}', '${c.address}',
             '${c.phone}', '${c.email}', ${1}, '${temp}')`;
    return db.save(sql);
}

exports.addCustomer = (c) => {
    var password = SHA256(c.password).toString();
    var sql = `insert into users(Username, Password, Fullname, CMND, DOB, Sex, Address, Phone, Email, Permission, Actived)
    values('${c.username}', '${password}', '${c.name}', 'null', 'null','Unknown', 'null', '${c.phone}', '${c.email}', 0, 1)`;
    return db.save(sql);
}
exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from users where id = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.singleByUsername = (username) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from users where Username = '${username}'`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getMaxID = () => {
    var sql = `select max(id) from users`;
    return db.load(sql);
}

exports.search = (searchname, permission) => {
    var sql = `select * from users where Username like '%${searchname}%' and Permission = ${permission}`;
    return db.load(sql);
}

exports.checkUsername = (username) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from users where Username = '${username}'`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.update = (c) => {
    var actived = 0;
    if (c.checkbox === '')
        actived = 1;
    c.dob = moment(c.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    var sql = `update users set Username = '${c.username}', Fullname='${c.fullname}',  CMND='${c.cmnd}',
                DOB='${c.dob}',Sex='${c.sex}',Address='${c.address}',Phone='${c.phone}',
                Email='${c.email}',Actived='${actived}'  where id = ${c.id}`;
    return db.save(sql);
}


exports.updateinfo = (c) => {
    c.dob = moment(c.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    var sql = `update users set Fullname='${c.fullname}',  CMND='${c.cmnd}',
                DOB='${c.dob}', Sex ='${c.sex}', Address='${c.address}', Phone='${c.phone}',
                Email='${c.email}'  where id = ${c.id}`;
    return db.save(sql);
}
exports.resetpassword = (c) => {
    var newPassword = SHA256('00000').toString();
    var sql = `update users set Password='${newPassword}'where id = ${c.id}`;
    return db.save(sql);
}

exports.updatepassword = (c) => {
    var newPassword = SHA256(c.newPassword).toString();
    var sql = `update users set Password='${newPassword}'where id = ${c.id}`;
    return db.save(sql);
}


exports.loadAllbyLimit = (offset) => {
    var sql = `select * from users where Permission = 1 limit ${config.USERS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.loadAllCustomersbyLimit = (offset) => {
    var sql = `select * from users where Permission = 0 limit ${config.USERS_PER_PAGE} offset ${offset} `;
    return db.load(sql);
}

exports.countUsers = () => {
    var sql = `select count(*) as total from users where Permission = 1`;
    return db.load(sql);
}

exports.countCustomers = () => {
    var sql = `select count(*) as total from users where Permission = 0`;
    return db.load(sql);
}

exports.login = user => {
    var sql = `select * from users where Username = '${user.username}' and Password = '${user.password}' and Actived = 1 and Permission = 1`;
    return db.load(sql);
}

exports.loginCustomer = user => {
    var sql = `select * from users where Username = '${user.username}' and Password = '${user.password}'`;
    return db.load(sql);
}

exports.updateCustomer = (c) => {
    if(c.dob == ''){
        c.dob = 'null';
    }
    else{
        c.dob = moment(c.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
    if(c.cmnd == ''){
        c.cmnd = 'null';
    }
    if(c.address == ''){
        c.address = 'null';
    }
    var sql = `update users set Fullname='${c.name}', CMND = '${c.cmnd}',
     DOB = '${c.dob}', Sex = '${c.sex}', Address = '${c.address}', Phone = '${c.phone}', Email = '${c.email}' where id = ${c.id}`;
    return db.save(sql);
}