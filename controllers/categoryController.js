

var express = require('express');
var categoryRepo = require('../repos/categoryRepo'),
    productRepo = require('../repos/productRepo');

var config = require('../config/config');

var restrict = require('../middle-wares/restrict');

var router = express.Router();

// router.get('/', restrict, (req, res) => {
//     categoryRepo.loadAll().then(rows => {
//         var vm = {
//             categories: rows
//         };
//         res.render('admin/category/index', vm);
//     });
// });

router.get('/', restrict, (req, res) => {

    /*kiểm tra đang ở trang nào của phân trang */
    var page = req.query.page;
    if (!page) //nếu ban đầu dô thì page = 1
        page = 1;
    /*end kiểm tra */

    var offset = (page - 1) * config.CATEGORIES_PER_PAGE;//tính limit có thể có trong 1 trang

    var p1 = categoryRepo.loadAllbyLimit(offset); //load các category trong khoảng phù hợp
    var p2 = categoryRepo.countCategories(); //đếm tổng số category

    //vì không thể chạy lồng promise nên phải chạy song song
    Promise.all([p1, p2]).then(([pRows, countRows]) => {

        var total = countRows[0].total;//total là số lượng user

        /*tính số page cần có */
        var nPage = Math.floor(total / config.CATEGORIES_PER_PAGE);
        if (total % config.CATEGORIES_PER_PAGE > 0)
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
            if(numbers[i].isCurPage){
                if(numbers[i].value === 1){
                    firstPage = {
                        isFirstPage: true,
                        value: numbers[i].value
                    }
                    lastPage = {
                        isLastPage: false,
                        value: numbers[i].value + 1
                    }
                }
                else if(numbers[i].value === nPage){
                    lastPage = {
                        isLastPage: true,
                        value: numbers[i].value
                    }
                    firstPage = {
                        isFirstPage: false,
                        value: numbers[i].value - 1
                    }
                }
                else{
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
        // console.log(firstPage);
        // console.log(lastPage);
        /*obj vm để đẩy ra giao diện */
        var vm = {
            pagination: nPage !== 1,
            categories: pRows,
            noUser: pRows.length === 0,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage
        }
        /*end obj vm */

        res.render('admin/category/index',  vm);
    });
});




router.get('/add', (req, res) => {
    var vm = {
        alert: false
    };
    res.render('admin/category/add', vm);
});

router.post('/add', (req, res) => {
    categoryRepo.add(req.body).then(value => {
        var vm = {
            alert: true
        };
        res.redirect('/admin/category');
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
    categoryRepo.single(req.query.id).then(c => {
        var vm = {
            Category: c
        };
        res.render('admin/category/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    categoryRepo.update(req.body).then(value => {
        res.redirect('/admin/category');
    });
});
router.get('/delete', (req, res) => {
    var id = req.query.id;
    categoryRepo.single(id).then(c => {
        vm = {
            category: c
        }
        res.render('admin/category/delete', vm);
    });
});

router.post('/delete', (req, res) => {
    var id = req.body.id;
    productRepo.loadAllbyCategory(id).then(c => {
        if (c.length != 0) {
            categoryRepo.single(id).then(c => {
                vm = {
                    category: c,
                    error: true
                }
                res.render('admin/category/delete', vm);
            });
        }
        else {
            categoryRepo.deleteCategory(id).then(value => {
                res.redirect('/admin/category');
            });
        }
    });
});
module.exports = router;