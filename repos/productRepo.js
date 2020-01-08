var db = require('../fn/db');
var moment = require('moment'),
    SHA256 = require('crypto-js/sha256');

var config = require('../config/config');

exports.loadAll = () => {
    var sql = `select pros.id as id, pros.Name as Name, cates.Name as Category, brs.Name as Brand,
    pros.Amount as Amount, pros.Date as Date, pros.Sale as Sale, pros.Sell as Sell, pros.Price as Price, users.Fullname as Creator 
    from products pros, users, brands brs, categories cates
    where pros.Category = cates.id and pros.Brand = brs.id and pros.Creator = users.id`;
    return db.load(sql);
}
exports.productbestview = () => {
    var sql = `select * from products order by View DESC limit 10`;
    return db.load(sql);
}

exports.productlatest = () => {
    var sql = `select * from products order by Date DESC limit 10`;
    return db.load(sql);
}

exports.bestsell = () => {
    var sql = `select * from products order by Sell DESC limit 10`;
    return db.load(sql);
}

exports.add = (c) => {
    var date = moment(new Date()).format("YYYY-MM-DD");
    var sql = `insert into products(Name, Picture, Description, Date, View,
         Sale, Price, Category, Brand, Author, Origin, Creator, Amount, Sell) 
    values('${c.name}', '${c.img}', '${c.description}', '${date}', 0,
     ${+c.sale}, ${+c.price}, ${+c.category}, ${+c.brand}, '${c.author}', '${c.origin}',
      ${+c.creator}, ${+c.amount},0)`;
    return db.save(sql);
}


exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select pros.id as id,pros.Sell as Sell, pros.Name as Name,pros.Date as Date, pros.View as View, pros.Amount as Amount, pros.Picture as Picture, pros.Amount as Amount,
         cates.id as CateId, pros.Description as Description, pros.Author as Author, pros.Origin as Origin,
        cates.Name as CatName,brs.id as BraId, brs.Name as BraName,
        pros.Sale as Sale, pros.Price as Price, users.Fullname as Creator, users.id as userId
        from products pros, users, brands brs, categories cates
        where pros.Category = cates.id and pros.Brand = brs.id and pros.Creator = users.id and pros.id = ${id}`;
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
    // var picture = c.picture;
    // if(c.img !== '')
    //     picture = c.img;
    var date = moment(new Date()).format("YYYY-MM-DD");
    var sql = `update products set Name = '${c.name}', Picture = '${c.picture}', Amount = ${+c.amount},  Description = '${c.description}',
                Date = '${date}', Sale = ${+c.sale}, Price = ${+c.price}, Category = ${+c.category}, Brand = ${+c.brand},
                Author = '${c.author}', Origin = '${c.origin}', Creator = ${+c.creator}  where id = ${c.id}`;
    return db.save(sql);
}

exports.loadAllProductsbyLimit = (offset) => {
    var sql = `select pros.id as id, pros.Name as Name, pros.Amount as Amount, cates.Name as Category, brs.Name as Brand,
    pros.Date as Date, pros.Sale as Sale, pros.Price as Price, users.Fullname as Creator 
    from products pros, users, brands brs, categories cates
    where pros.Category = cates.id and pros.Brand = brs.id and pros.Creator = users.id 
    limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countProducts = () => {
	var sql = `select count(*) as total from products`;
    return db.load(sql);
}

exports.loadAllbyCategory = (id) => {
	var sql = `select * from products where Category = ${id}`;
    return db.load(sql);
}

exports.loadAllbyBrand = (id) => {
	var sql = `select * from products where Brand = ${id}`;
    return db.load(sql);
}

exports.countProductsbyCategory = (id) => {
	var sql = `select count(*) as total from products where Category = ${id}`;
    return db.load(sql);
}

exports.loadAllProductsbyCategory = (id, limit, offset) => {
	var sql = `select * from products where Category = ${id} limit ${limit} offset ${offset}`;
    return db.load(sql);
}


exports.updateViewProduct = (id, view) => {
	var sql = `update products set View = ${view} where id = ${id}`;
    return db.load(sql);
}

exports.countProductsbyBrand = (id) => {
    var sql = `select count(*) as total from products where Brand = ${id}`;
    return db.load(sql);
}

exports.loadAllProductsbyBrand = (id, limit, offset) => {
    var sql = `select * from products where Brand = ${id} limit ${limit} offset ${offset}`;
    return db.load(sql);
}

exports.searchProduct = (c) => {
    var sql = `select * from products where Name like '%${c.key}%'`;
    return db.load(sql);
}

exports.updateCartAmount = (cart) => {
    for (let i = 0; i < cart.length; i++) 
    {
        var sql = ` update products 
                    set Amount = Amount - ${cart[i].Count}, Sell = Sell + ${cart[i].Count}  
                    where id = ${cart[i].id}`;
        db.save(sql);
    }
}

exports.deleteProduct = (id) => {
    var sql = `delete from products where id = ${id}`;
    return db.save(sql);
}
