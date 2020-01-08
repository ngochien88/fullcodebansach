
var express = require('express'),
    moment = require('moment'),
    SHA256 = require('crypto-js/sha256');

var config = require('../config/config');
var router = express.Router();

var userRepo = require('../repos/userRepo');
var restrict = require('../middle-wares/restrict');

router.get('/', restrict, (req, res) => {

    /*kiểm tra đang ở trang nào của phân trang */
    var page = req.query.page;
    if (!page) //nếu ban đầu dô thì page = 1
        page = 1;
    /*end kiểm tra */

    var offset = (page - 1) * config.USERS_PER_PAGE;//tính limit có thể có trong 1 trang

    var p1 = userRepo.loadAllbyLimit(offset); //load các user trong khoảng phù hợp
    var p2 = userRepo.countUsers(); //đếm tổng số user

    //vì không thể chạy lồng promise nên phải chạy song song
    Promise.all([p1, p2]).then(([pRows, countRows]) => {

        var total = countRows[0].total;//total là số lượng user

        /*tính số page cần có */
        var nPage = Math.floor(total / config.USERS_PER_PAGE);
        if (total % config.USERS_PER_PAGE > 0)
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

        /*kiểm tra Actived và convert DOB cho dễ nhìn */
        for (let i = 0; i < pRows.length; i++) {
            var check = true;
            if (pRows[i].Actived === 0)
                check = false;
            pRows[i].check = check;
            pRows[i].DOB = moment(pRows[i].DOB).format("DD/MM/YYYY");
        }
        /*end kiểm tra và convert */
        // console.log(firstPage);
        // console.log(lastPage);
        /*obj vm để đẩy ra giao diện */
        var vm = {
            pagination: nPage !== 1,
            users: pRows,
            noUser: pRows.length === 0,
            page_numbers: numbers,
            firstPage: firstPage,
            lastPage: lastPage,
        }
        /*end obj vm */

        res.render('admin/users/index', vm);
    });
});

router.get('/result', (req, res) => {
    console.log(req.query);
    var key = req.query.key;
    userRepo.search(req.query.key, 1).then(rows => {
        for (let i = 0; i < rows.length; i++) {
            var active = true;
            var block = true;
            if (rows[i].Actived === 0)
                active = false;
            if (rows[i].Actived === 1)
                block = false;
            rows[i].active = active;
            rows[i].block = block;
            rows[i].isAdmin = true;
            rows[i].DOB = moment(rows[i].DOB).format("DD/MM/YYYY");
        }
        if (rows.length == 0) {
            vm = {
                noUser: true,
                count: 0,
            }
        }
        else {
            vm = {
                result: rows,
                count: rows.length,
                admin: true,
                key: key
            }
        }
        res.render('admin/users/search', vm);
    });
});


router.get('/add', restrict, (req, res) => {
    userRepo.loadAll().then(rows => {
        var vm = {
            alert: false
        };
        res.render('admin/users/add', vm);
    });
});


router.post('/add', (req, res) => {
    var obj = req.body;
    userRepo.checkUsername(obj.username).then(c => {
        if (c == null && obj.username != '') {
            userRepo.add(obj).then(value => {
                var vm = {
                    error: false
                };
                res.redirect('/admin/users');
            }).catch(err => {
                console.log(err);
                res.end('fail');
            });
        }
        else {
            vm = {
                error: true
            }
            res.render('admin/users/add', vm);
        }
    });
});

router.get('/edit', restrict, (req, res) => {
    userRepo.single(req.query.id).then(c => {
        if (c.Actived === 0)
            c.check = false;
        else c.check = true;
        c.DOB = moment(c.DOB).format("DD/MM/YYYY");
        var vm = {
            users: c
        };
        res.render('admin/users/edit', vm);
    });
});
router.post('/edit', (req, res) => {
    userRepo.update(req.body).then(value => {
        res.redirect('/admin/users');
    });
});

router.get('/resetpassword', restrict, (req, res) => {
    userRepo.single(req.query.id).then(c => {
        var vm = {
            users: c
        };
        res.render('admin/users/resetpassword', vm);
    });
});
router.post('/resetpassword', (req, res) => {
    var p1 = userRepo.single(req.body.id);
    var p2 = userRepo.resetpassword(req.body);
    Promise.all([p1, p2]).then(([user, value]) => {
        if (user.Permission == 1)
            res.redirect('/admin/users');
        else res.redirect('/admin/customers');
    });
});

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    res.redirect('/admin');
});

router.get('/info', restrict, (req, res) => {
    userRepo.single(req.session.user.id).then(c => {
        c.DOB = moment(c.DOB).format("DD/MM/YYYY");
        var vm = {
            users: c
        };
        res.render('admin/users/info', vm);
    });
});
router.post('/info', (req, res) => {
    userRepo.updateinfo(req.body).then(value => {
        res.redirect('/admin/dashboard');
    });
});

router.get('/changepassword', restrict, (req, res) => {
    var vm = {
        error: false,
        success: false
    }
    res.render('admin/users/changepassword', vm);
});

router.post('/changepassword', (req, res) => {
    req.body.id = req.session.user.id;
    var obj = req.body;
    userRepo.single(obj.id).then(c => {
        if (c.Password === SHA256(req.body.curPassword).toString() && obj.newPassword === obj.confPassword) {
            userRepo.updatepassword(obj).then(value => {
                vm = {
                    error: false,
                    success: true
                }
                res.render('admin/users/changepassword', vm);
            });
        }
        else {
            vm = {
                error: true,
                success: false
            }
            res.render('admin/users/changepassword', vm);
        }
    });
});


router.get('/back', (req, res) => {

    res.redirect(req.headers.referer);
});

/* customer */



module.exports = router;