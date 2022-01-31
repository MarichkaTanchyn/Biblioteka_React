var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// const indexRouter = require('./routes/index');
// const employeeRouter = require('./routes/employeeRoute');
// const employmentRouter = require('./routes/employmentRoutes');
// const departmentRouter = require('./routes/departmentRoutes');
const empApiRouter = require('./routes/api/EmployeeApiRoute');
const emplApiRouter = require('./routes/api/EmploymentApiRoute');
const deptApiRouter = require('./routes/api/DepartmentApiRoute');
const cors = require('cors');
const authApiRouter = require('./routes/api/AuthApiRoute');
var bodyParser = require('body-parser')

var app = express();

app.use(cors());
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "my_secret_password",
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

app.use(cookieParser('secret'));

const i18n = require('i18n');
i18n.configure({
    locales: ['en', 'pl'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
    directory: path.join(__dirname,'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
    defaultLocale: 'en',
    objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
    cookie: 'acme-hr-lang' //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o
    //języku aktualnie wybranym przez użytkownika
});

app.use(i18n.init);

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
    res.status(err.status || 500);
    res.send('error');//this or res.status(err.status || 500).send('error')
});

// app.use('/', indexRouter);
// app.use('/employments', employmentRouter);
// app.use('/employees', employeeRouter);
// app.use('/departments', departmentRouter);

app.use('/api/employees', empApiRouter);
app.use('/api/employments', emplApiRouter);
app.use('/api/departments', deptApiRouter);
app.use('/api/auth',authApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("Error returned in app.js")
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
