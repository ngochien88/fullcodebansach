var userRepo = require('../repos/userRepo'),
    categoryRepo = require('../repos/categoryRepo'),
    brandRepo = require('../repos/brandRepo'),
    productRepo = require('../repos/productRepo');


module.exports = (req, res, next) => {
    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
    if (!req.session.Total)
        req.session.Total = 0;
    if (!req.session.cartLayout)
        req.session.cartLayout = [];
    var p1 = categoryRepo.loadAll();
    var p2 = brandRepo.loadAll();
    var p3 = userRepo.loadAll();
    Promise.all([p1, p2, p3]).then(([cateRows, brandRows, userRows]) => {
        var preUrl = req.header('Referer');
        var b4 = Math.floor(brandRows.length / 4);
        var m4 = brandRows.length % 4;
        var bra1 = [];
        var bra2 = [];
        var bra3 = [];
        var bra4 = [];
        var temp = [];
        var arr = [];
        for (let i = 0; i < brandRows.length; i++) {
            if (i < b4) {
                bra1.push(brandRows[i]);
            }
            else if (i >= b4 && i < 2 * b4) {
                bra2.push(brandRows[i]);
            }
            else if (i >= 2 * b4 && i < 3 * b4) {
                bra3.push(brandRows[i]);
            }
            else if (i >= 3 * b4 && i < 4 * b4) {
                bra4.push(brandRows[i]);
            }
            else temp.push(brandRows[i]);
        }
        arr.push(bra1);
        arr.push(bra2);
        arr.push(bra3);
        arr.push(bra4);
        for (let i = 0; i < temp.length; i++) {
            arr[i].push(temp[i]);
        }
        // console.log(bra1);
        // console.log(bra2);
        // console.log(bra3);
        // console.log(bra4);
        res.locals.layoutVM = {
            users: userRows,
            categories: cateRows,
            brands: brandRows,
            brand1: arr[0],
            brand2: arr[1],
            brand3: arr[2],
            brand4: arr[3],
            isLogged: req.session.isLogged,
            curUser: req.session.user,
            preUrl: preUrl,
            total: req.session.Total,
            cartLayout: req.session.cartLayout,
            isEmpty: req.session.cartLayout.length == 0
        };
        //console.log(cateRows);
        next();
    });
};