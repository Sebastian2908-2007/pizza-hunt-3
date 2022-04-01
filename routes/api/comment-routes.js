const router = require('express').Router();
const {addComment,removeComment}= require('../../controllers/comment-controller');

///api/comments/<pizzaId>
// the /:pizzaId portion of the route is the name you will use in your controller to refer to the respective id's
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaID>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;