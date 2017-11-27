var express = require('express');
var router = express.Router();
var middlewares = require("../middlewares");
var models      = require("../models");
var Promise = require("bluebird");

/* GET admin page. */
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    res.render('admin/index');
});

/* GET new model page. */
router.get('/models', middlewares.isLoggedIn, function (req, res, next) {

    models.Model
    .findAll()
    .then(models => {
        res.render('admin/models/index', {
            models
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
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

/* GET model edit page */
router.get("/models/:id/edit", middlewares.isLoggedIn, function (req, res, next) {

    models.Model.findById(req.params.id)
    .then(model => {
        res.render('admin/models/edit', {
            model
        });
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* PUT model route */
router.put("/models/:id", middlewares.isLoggedIn, function (req, res, next) {

    models.Model.findById(req.params.id)
    .then(model => {
        return model.update({
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
        });
    })
    .then(() => {
        res.redirect('/admin/models');
    })
    .catch(error => {
        console.log("Oops, something went wrong. " + error);
    });

});

/* DELETE model category */
router.delete('/models/:id', middlewares.isLoggedIn, function (req, res, next) {

    models.Model
    .findOne({
        where: {
            id: req.params.id
        }
    })
    .then(model => {
        return model.destroy();
    })
    .then(() => {
        res.redirect('/admin/models');
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

/* GET model category edit page */
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

/* PUT model category route */
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

/* DELETE model category */
router.delete('/categories/:id', middlewares.isLoggedIn, function (req, res, next) {

    models.Category
    .findOne({
        where: {
            id: req.params.id
        }
    })
    .then(category => {
        return category.destroy();
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