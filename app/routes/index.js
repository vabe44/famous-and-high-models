const express = require('express');
const router = express.Router();
const mw = require("../middlewares");
const m = require("../models");

/* GET index page. */
router.get('/models', mw.asyncMiddleware(async (req, res, next) => {
    const models = await m.Model.findAll({ include: [ m.Image ]});
    res.render('models/index', { models });
}));

module.exports = router;