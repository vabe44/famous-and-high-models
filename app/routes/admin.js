var express = require('express');
var router = express.Router();
var middlewares = require("../middlewares");
var models      = require("../models");

/* GET admin index page. */
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    res.render('admin/index');
});

/* GET shoutout categories page. */
router.get('/models/new', middlewares.isLoggedIn, function (req, res, next) {

    models.Model
    .findAll()
    .then(models => {
        res.render('admin/models/new', {
            models
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* POST shoutout categories page. */
router.post('/models/new', middlewares.isLoggedIn, function (req, res, next) {

    models.Model
    .create({ name: req.body.categoryname })
    .then(() => {
        res.redirect('back');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });
});


module.exports = router;