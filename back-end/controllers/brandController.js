



var express = require('express');
var brandRepo = require('../repos/brandRepo'),
    productRepo = require('../repos/productRepo');

var config = require('../config/config');

var restrict = require('../middle-wares/restrict');

var router = express.Router();

// router.get('/', (req, res) => {
//     brandRepo.loadAll().then(rows => {
//         var vm = {
//             brands: rows
//         };
//         res.render('admin/brands/index', vm);
//     });
// });

router.get('/', restrict, (req, res) => {

    /*kiểm tra đang ở trang nào của phân trang */
    var page = req.query.page;
    if (!page) //nếu ban đầu dô thì page = 1
        page = 1;
    /*end kiểm tra */

    var offset = (page - 1) * config.BRANDS_PER_PAGE;//tính limit có thể có trong 1 trang

    var p1 = brandRepo.loadAllbyLimit(offset); //load các category trong khoảng phù hợp
    var p2 = brandRepo.countBrands(); //đếm tổng số category

    //vì không thể chạy lồng promise nên phải chạy song song
    Promise.all([p1, p2]).then(([pRows, countRows]) => {

        var total = countRows[0].total;//total là số lượng user

        /*tính số page cần có */
        var nPage = Math.floor(total / config.BRANDS_PER_PAGE);
        if (total % config.BRANDS_PER_PAGE > 0)
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

        /*obj vm để đẩy ra giao diện */
        var vm = {
            pagination: nPage !== 1,
            brands: pRows,
            noUser: pRows.length === 0,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage
        }
        /*end obj vm */

        res.render('admin/brands/index', vm);
    });
});




router.get('/add', (req, res) => {
    var vm = {
        alert: false
    };
    res.render('admin/brands/add', vm);
});

router.post('/add', (req, res) => {
    brandRepo.add(req.body).then(value => {
        var vm = {
            alert: true
        };
        res.redirect('/admin/brands');
    }).catch(err => {
        res.end('fail');
    });
});

// router.get('/delete', (req, res) => {
//     var vm = {
//         CatId: req.query.id
//     }
//     res.render('category/delete', vm);
// });

// router.post('/delete', (req, res) => {
//     categoryRepo.delete(req.body.CatId).then(value => {
//         res.redirect('/category');
//     });
// });

router.get('/edit', (req, res) => {
    brandRepo.single(req.query.id).then(c => {
        var vm = {
            brand: c
        };
        res.render('admin/brands/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    brandRepo.update(req.body).then(value => {
        res.redirect('/admin/brands');
    });
});

router.get('/delete', (req, res) => {
    var id = req.query.id;
    brandRepo.single(id).then(c => {
        vm = {
            brand: c
        }
        res.render('admin/brands/delete', vm);
    });
});

router.post('/delete', (req, res) => {
    var id = req.body.id;
    productRepo.loadAllbyBrand(id).then(c => {
        if (c.length != 0) {
            brandRepo.single(id).then(c => {
                vm = {
                    brand: c,
                    error: true
                }
                res.render('admin/brands/delete', vm);
            });
        }
        else {
            brandRepo.deleteBrand(id).then(value => {
                res.redirect('/admin/brands');
            });
        }
    });
});
module.exports = router;