module.exports = (req, res, next) => {
    var vm = {
        layout: false
    }
    res.statusCode = 404;
    res.render('admin/error/index', vm);
};