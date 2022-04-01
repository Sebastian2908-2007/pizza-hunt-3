const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

// consume and prefix comment routes
router.use('/comments',commentRoutes);

// consume and prefix pizza routes
router.use('/pizzas',pizzaRoutes);

module.exports = router;