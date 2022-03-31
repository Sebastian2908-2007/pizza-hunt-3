const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// consume and prefix pizza routes
router.use('/pizzas',pizzaRoutes);

module.exports = router;