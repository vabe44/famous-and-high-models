var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.send('Welcome to Passport with Sequelize');
});

// Models
var models = require("./app/models");

// Load passport strategies
require('./app/config/passport/passport.js')(passport, models.User);

// Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// Current User Local
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
var adminRoute = require('./app/routes/admin');

app.use('/admin', adminRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

app.listen(5000, function(err){
    if(!err)
    console.log("Site is live"); else console.log(err)
});