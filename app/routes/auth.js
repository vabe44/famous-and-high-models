var middlewares = require("../middlewares");

module.exports = function (app, passport) {

    /* GET signup page. */
    app.get('/signup', function (req, res, next) {
        res.render('signup');
    });

    /* POST signup page. */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/signup'
    }
    ));

    /* GET login page. */
    app.get('/login', function (req, res, next) {
        res.render('login');
    });

    /* POST login page. */
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/admin',
        failureRedirect: '/login'
    }
    ));

    /* GET logout page. */
    app.get('/logout', function (req, res, next) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

    /* GET admin page. */
    app.get('/admin', middlewares.isLoggedIn, function (req, res, next) {
        res.render('admin/index');
    });

}