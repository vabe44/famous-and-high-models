module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    },

    asyncMiddleware: function(fn) {
        return function (req, res, next) {
          Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}