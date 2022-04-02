const router = require('express').Router();
const {addComment,removeComment,addReply,removeReply}= require('../../controllers/comment-controller');


///api/comments/<pizzaId>
// the /:pizzaId portion of the route is the name you will use in your controller to refer to the respective id's
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaID>/<commentId>
router.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// this route will be for deleting a reply
router
.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);
module.exports = router;