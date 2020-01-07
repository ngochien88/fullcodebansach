
var express = require('express');

var orderRepo = require('../repos/orderRepo');
var productRepo = require('../repos/orderRepo');
var userRepo = require('../repos/userRepo');

var helpers = require('handlebars-helpers')();

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

router.get('/',  (req, res) => {
    
    /*kiểm tra đang ở trang nào của phân trang */
    var page = req.query.page;
    if (!page) //nếu ban đầu dô thì page = 1
        page = 1;
    /*end kiểm tra */

    var offset = (page - 1) * config.CATEGORIES_PER_PAGE;//tính limit có thể có trong 1 trang

    var p1 = orderRepo.loadAllbyLimit(offset); //load các order trong khoảng phù hợp
    var p2 = orderRepo.countOrders(); //đếm tổng số order
    var p3 = orderRepo.loadAllDetail();
    var p4 = userRepo.loadAll();

    //vì không thể chạy lồng promise nên phải chạy song song
    Promise.all([p1, p2, p3, p4]).then(([pRows, countRows, cRows, uRows]) => {
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
            orders: pRows,
            noUser: pRows.length === 0,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage,
            order_detail: cRows,
            userName: uRows,
        }
        /*end obj vm */

        res.render('admin/orders/index',  vm);
    });
});




router.get('/add', (req, res) => {
    var vm = {
        alert: false
    };
    res.render('admin/orders/add', vm);
});

router.post('/add', (req, res) => {
    brandRepo.add(req.body).then(value => {
        var vm = {
            alert: true
        };
        res.redirect('/admin/orders');
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

    var p1 = orderRepo.singleWithName(req.query.id);
    var p2 = orderRepo.loadDetailByOrderID(req.query.id);

    Promise.all([p1, p2]).then(([pRows, cRows]) => {
        var vm = {
            order: pRows,
            order_detail: cRows,
        };
        res.render('admin/orders/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    orderRepo.update(req.body).then(value => {
        res.redirect('/admin/orders');
    });
});


module.exports = router;