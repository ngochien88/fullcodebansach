
var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');

var path = require('path');
var wnumb = require('wnumb');
var logger = require('morgan')

var passport = require('./config/passport');
var userController = require('./controllers/userController'),
    dashboardController = require('./controllers/dashboardController'),
    accountController = require('./controllers/accountController'),
    categoryController = require('./controllers/categoryController'),
    brandController = require('./controllers/brandController'),
    productController = require('./controllers/productController'),
    orderController = require('./controllers/orderController'),
    cartController = require('./controllers/cartControllers');


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var handle404 = require('./middle-wares/handle404'),
    handleLayout = require('./middle-wares/handleLayout');
var config = require('./config/config');
var app = express();


app.use(logger('dev'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));

app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());

// session
var sessionStoreConfig = {
    ...config.DB,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
var sessionStore = new MySQLStore(sessionStoreConfig);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(handleLayout);

app.use('/', accountController);
app.use('/admin/users', userController);
app.use('/admin/dashboard', dashboardController);
app.use('/admin/brands', brandController);
app.use('/admin/category', categoryController);
app.use('/admin/products', productController);
app.use('/admin/orders', orderController);
app.use('/cart', cartController);

app.use(handle404);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Site  running on port:', port);
});



