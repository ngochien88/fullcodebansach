var db = require('../fn/db');

var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from brands';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from brands where id = ${id}`;
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

exports.add = (c) => {
    var sql = `insert into brands(Name, Description) values('${c.name}','${c.description}')`;
    return db.save(sql);
}

// exports.delete = (id) => {
//     var sql = `delete from categories where CatId = ${id}`;
//     return db.save(sql);
// }

exports.update = (c) => {
    var sql = `update brands set Name = '${c.name}', Description = '${c.description}' where id = ${c.id}`;
    return db.save(sql);
}


exports.loadAllbyLimit = (offset) => {
    var sql = `select * from brands limit ${config.BRANDS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}


exports.countBrands = () => {
	var sql = `select count(*) as total from brands`;
    return db.load(sql);
}

exports.deleteBrand = (id) => {
    var sql = `delete from brands where id = ${id}`;
    return db.save(sql);
}

