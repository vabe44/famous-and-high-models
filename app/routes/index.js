const express = require('express');
const router = express.Router();
const mw = require("../middlewares");
const m = require("../models");

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET all models index page. */
router.get('/models', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({ include: [ m.Image ]});
    res.render('models/index', { models });
}));

/* GET women models index page. */
router.get('/women', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({where: { category_id: 1 }, include: [ m.Image ]});
    res.render('models/index', { models });
}));

/* GET women models index page. */
router.get('/men', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({where: { category_id: 2 }, include: [ m.Image ]});
    res.render('models/index', { models });
}));

/* GET women models index page. */
router.get('/event-popups', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({where: { category_id: 3 }, include: [ m.Image ]});
    res.render('models/index', { models });
}));

/* GET women models index page. */
router.get('/products', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({where: { category_id: 4 }, include: [ m.Image ]});
    res.render('models/index', { models });
}));

/* GET index page. */
router.get('/models/:id', mw.asyncMiddleware(async (req, res, next) => {
    const model = await m.Model.findOne({ where: {id: req.params.id}, include: [ m.Image ]});
    res.render('models/model', { model });
}));

/* GET index page. */
router.get('/favorites', function(req, res, next) {
    res.render('favorites');
});

/* GET index page. */
router.get('/about', function(req, res, next) {
    res.render('about');
});

/* GET index page. */
router.get('/contact', function(req, res, next) {
    res.render('contact');
});

/* GET index page. */
router.get('/join', function(req, res, next) {
    res.render('join');
});

/* POST new model page. */
router.post('/join', mw.asyncMiddleware(async (req, res, next) => {

    await m.Applicant.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        dateofbirth: req.body.dateofbirth,
        message: req.body.message,
        gender: req.body.gender,
        height: req.body.height,
        bust: req.body.bust,
        waist: req.body.waist,
        hips: req.body.hips,
        dress: req.body.dress,
        shoe: req.body.shoe,
        hair: req.body.hair,
        eyes: req.body.eyes,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
    });
    req.flash("success", "Got it! Thank you for your application. You'll hear from us soon.");
    res.redirect('back');

}));

module.exports = router;