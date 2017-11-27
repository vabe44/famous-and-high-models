var express = require('express');
var router = express.Router();
var middlewares = require("../middlewares");
var models      = require("../models");

/* GET new model page. */
router.get('/models/new', middlewares.isLoggedIn, function (req, res, next) {
    res.render('admin/models/new', {
        models
    });
});

/* POST new model page. */
router.post('/models/new', middlewares.isLoggedIn, function (req, res, next) {

    models.Model
    .create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        height: req.body.height,
        bust: req.body.bust,
        waist: req.body.waist,
        hips: req.body.hips,
        dress: req.body.dress,
        shoe: req.body.shoe,
        hair: req.body.hair,
        eyes: req.body.eyes
    })
    .then(() => {
        res.redirect('back');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });
});

/* GET model categories page. */
router.get('/categories', middlewares.isLoggedIn, function (req, res, next) {

    models.Category
    .findAll()
    .then(categories => {
        res.render('admin/categories/index', {
            categories
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* POST model categories page. */
router.post('/categories/new', middlewares.isLoggedIn, function (req, res, next) {

    models.Category
    .create({ name: req.body.categoryname })
    .then(() => {
        res.redirect('back');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });
});

/* EDIT model category page */
router.get("/categories/:id/edit", middlewares.isLoggedIn, function (req, res, next) {

    models.Category.findById(req.params.id)
    .then(category => {
        res.render('admin/categories/edit', {
            category
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* EDIT model category page */
router.put("/categories/:id", middlewares.isLoggedIn, function (req, res, next) {

    models.Category.findById(req.params.id)
    .then(category => {
        category.name = req.body.categoryname;
        return category.save();
    })
    .then(() => {
        res.redirect('/admin/categories');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* GET images page. */
router.get('/images', middlewares.isLoggedIn, function (req, res, next) {

    models.Image
    .findAll()
    .then(images => {
        res.render('admin/images/index', {
            images
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* POST model images page. */
router.post('/images/new', middlewares.isLoggedIn, function (req, res, next) {

    models.Image
    .create({ name: req.body.imagename })
    .then(() => {
        res.redirect('back');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });
});

module.exports = router;