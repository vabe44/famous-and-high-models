const express = require('express');
const router = express.Router();
const mw = require("../middlewares");
const models      = require("../models");
const Promise = require("bluebird");

/* GET admin page. */
router.get('/', mw.isLoggedIn, function (req, res, next) {
    res.render('admin/index');
});

/* GET new model page. */
router.get('/models', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const allModels = await models.Model.findAll();
    const categories = await models.Category.findAll();
    res.render('admin/models/index', {
        allModels, categories
    });

}));

/* POST new model page. */
router.post('/models/new', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    await models.Model.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        height: req.body.height,
        bust: req.body.bust,
        waist: req.body.waist,
        hips: req.body.hips,
        dress: req.body.dress,
        shoe: req.body.shoe,
        hair: req.body.hair,
        eyes: req.body.eyes,
        category_id: req.body.category
    });
    res.redirect('back');

}));


/* GET model edit page */
router.get("/models/:id/edit", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const model = await models.Model.findById(req.params.id);
    const categories = await models.Category.findAll();
    res.render('admin/models/edit', {
        model, categories
    });

}));

/* PUT model route */
router.put("/models/:id", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const model = await models.Model.findById(req.params.id);
    await model.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        height: req.body.height,
        bust: req.body.bust,
        waist: req.body.waist,
        hips: req.body.hips,
        dress: req.body.dress,
        shoe: req.body.shoe,
        hair: req.body.hair,
        eyes: req.body.eyes,
        category_id: req.body.category
    });
    res.redirect('/admin/models');

}));

/* DELETE model category */
router.delete('/models/:id', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const model = await models.Model.findById(req.params.id);
    await model.destroy();
    res.redirect('/admin/models');

}));

/* GET model categories page. */
router.get('/categories', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const categories = await models.Category.findAll();
    res.render('admin/categories/index', {
        categories
    });

}));

/* POST model categories page. */
router.post('/categories/new', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    await models.Category.create({ name: req.body.categoryname });
    res.redirect('back');
}));

/* GET model category edit page */
router.get("/categories/:id/edit", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const category = await models.Category.findById(req.params.id);
    res.render('admin/categories/edit', {
        category
    });

}));

/* PUT model category route */
router.put("/categories/:id", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const category = await models.Category.findById(req.params.id);
    await category.update({
        name: req.body.categoryname
    });
    res.redirect('/admin/categories');

}));

/* DELETE model category */
router.delete('/categories/:id', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const category = await models.Category.findById(req.params.id);
    await category.destroy();
    res.redirect('/admin/categories');

}));

/* GET images page. */
router.get('/images', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    const images = models.Image.findAll();
    res.render('admin/images/index', {
        images
    });

}));

/* POST model images page. */
router.post('/images/new', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {

    await models.Image.create({
        link: req.body.imagelink,
        title: req.body.imagetitle,
        model_id: req.body.modelId,
    });
    res.redirect('back');

}));

module.exports = router;