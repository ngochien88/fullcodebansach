
var express = require('express'),
    moment = require('moment'),
    SHA256 = require('crypto-js/sha256'),
    multer = require('multer');
var brandRepo = require('../repos/brandRepo'),
    productRepo = require('../repos/productRepo'),
    categoryRepo = require('../repos/categoryRepo'),
    userRepo = require('../repos/userRepo'),
    orderRepo = require('../repos/orderRepo');

var config = require('../config/config');

var restrict = require('../middle-wares/restrict');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/img/1')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.get('/', restrict, (req, res) => {
    /*kiểm tra đang ở trang nào của phân trang */
    var page = req.query.page;
    if (!page) //nếu ban đầu dô thì page = 1
        page = 1;
    /*end kiểm tra */

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;//tính limit có thể có trong 1 trang

    var p1 = productRepo.loadAllProductsbyLimit(offset); //load các user trong khoảng phù hợp
    var p2 = productRepo.countProducts(); //đếm tổng số user

    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;//total là số lượng user

        /*tính số page cần có */
        var nPage = Math.floor(total / config.PRODUCTS_PER_PAGE);
        if (total % config.PRODUCTS_PER_PAGE > 0)
            nPage++;
        /*end tính số page */

        /*start mảng số lượng page gồm số thứ tự và isCurPage */
        var numbers = [];
        for (let i = 1; i <= nPage; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }
        /*end mảng số lượng page */

        var firstPage = {};
        var lastPage = {};
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i].isCurPage) {
                if (numbers[i].value === 1) {
                    firstPage = {
                        isFirstPage: true,
                        value: numbers[i].value
                    }
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                }
                else if (numbers[i].value === nPage) {
                    lastPage = {
                        isLastPage: true,
                        value: numbers[i].value
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
                else {
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
            }
        }
        for (let i = 0; i < pRows.length; i++) {
            pRows[i].Date = moment(pRows[i].Date).format("DD/MM/YYYY");
        }

        /*obj vm để đẩy ra giao diện */
        var vm = {
            pagination: nPage !== 1,
            products: pRows,
            noProduct: pRows.length === 0,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage,
        }
        /*end obj vm */
        res.render('admin/products/index', vm);
    });
});

router.get('/result', (req, res) => {
    var key = req.query.key;
    if (req.query.key == '') {
        res.redirect(req.headers.referer)
    }
    else {
        productRepo.searchProduct(req.query).then(rows => {
            var arrCates = [];
            var arrBras = [];
            var arrUsers = [];
            var result = rows;
            for (let i = 0; i < rows.length; i++) {
                rows[i].Date = moment(rows[i].Date).format("DD/MM/YYYY");
                var cate = categoryRepo.single(rows[i].Category);
                arrCates.push(cate);

                var brand = brandRepo.single(rows[i].Brand);
                arrBras.push(brand);

                var user = userRepo.single(rows[i].Creator);
                arrUsers.push(user);
            }
            Promise.all(arrCates).then(pCates => {
                for (let i = 0; i < pCates.length; i++) {
                    result[i].cateName = pCates[i].Name;
                }
                Promise.all(arrBras).then(pBras => {
                    for (let i = 0; i < pBras.length; i++) {
                        result[i].braName = pBras[i].Name;
                    }
                    Promise.all(arrUsers).then(pUsers => {
                        for (let i = 0; i < pUsers.length; i++) {
                            result[i].creatorName = pUsers[i].Fullname;
                        }
                        //console.log(result);
                        vm = {
                            products: rows,
                            count: result.length,
                            key: key,
                            isEmpty: result.length == 0
                        }
                        res.render('admin/products/search', vm);
                    });
                });
            });

        });
    }
});
router.get('/add', restrict, (req, res) => {
    var brands = brandRepo.loadAll();
    var categories = categoryRepo.loadAll();
    Promise.all([brands, categories]).then(([brandRows, cateRows]) => {
        var vm = {
            brands: brandRows,
            categories: cateRows,
            alert: false
        };
        res.render('admin/products/add', vm);
    });
});

router.post('/add', upload.single("img"), (req, res) => {
    //console.log(req.body);
    //console.log(req.file);
    req.body.img = req.file.originalname;
    productRepo.add(req.body).then(value => {
        var vm = {
            alert: true
        };
        res.redirect('/admin/products');
    }).catch(err => {
        res.end(err);
    });
});

router.get('/edit', restrict, (req, res) => {

    var brands = brandRepo.loadAll();
    var categories = categoryRepo.loadAll();
    var product = productRepo.single(req.query.id);
    Promise.all([brands, categories, product]).then(([brandRows, cateRows, proRows]) => {
        for (let i = 0; i < cateRows.length; i++) {
            if (cateRows[i].id === proRows.CateId) {
                cateRows.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < brandRows.length; i++) {
            if (brandRows[i].id === proRows.BraId) {
                brandRows.splice(i, 1);
                break;
            }
        }
        var vm = {
            product: proRows,
            brands: brandRows,
            categories: cateRows,
            alert: false
        };
        res.render('admin/products/edit', vm);
    });
});

router.post('/edit', upload.single("img"), (req, res) => {
    if(req.file != undefined){
        req.body.picture = req.file.originalname;
    }
    productRepo.update(req.body).then(value => {
        res.redirect('/admin/products');
    });
});

router.get('/delete', (req, res) => {
    var id = req.query.id;
    productRepo.single(id).then(c => {
        vm = {
            product: c
        }
        res.render('admin/products/delete', vm);
    });
});

router.post('/delete', (req, res) => {
    var id = req.body.id;
    productRepo.single(id).then(c =>{
        if(c.Sell != 0){
            vm = {
                product: c,
                error: true
            }
            res.render('admin/products/delete', vm);
        }
        else{
            productRepo.deleteProduct(id).then(value => {
                res.redirect('/admin/products');
            });
        }
    });
});
module.exports = router;