const express = require('express');
const router = express.Router();
const mw = require("../middlewares");
const m = require("../models");

/* GET index page. */
router.get('/', function(req, res, next) {
    res.redirect('/models');
});

/* GET index page. */
router.get('/models', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({ include: [ m.Image ]});
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

module.exports = router;