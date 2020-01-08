
var express = require('express');
var router = express.Router();

router.get('/admin', (req, res) => {
    res.redirect('/admin/dashboard/index');
});
router.get('/', (req, res) => {
    var vm = {
        title: "this is dashboard page"
    }
    res.render('admin/dashboard/index', vm);
});

module.exports = router;