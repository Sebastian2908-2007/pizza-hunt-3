const {Pizza,Comment} = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
      console.log(body);
      Comment.create(body)
      .then(({_id}) => {
          return Pizza.findOneAndUpdate(
              // you use params.pizzaID because thats what you named that part of the route "pizzaID"
              // if you had /:id in the route you would use params.id etc.
              {_id: params.pizzaId},
              { $push: {comments: _id } },
              {new: true}
          );
      })
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'no pizza found with this id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
    },

    // remove comment
    removeComment({ params }, res) {
     Comment.findOneAndDelete({_id: params.commentId })
     .then(deletedComment => {
        if(!deletedComment) {
            return res.status(404).json({mesage: 'No comment found with that id'})
        }
        return Pizza.findOneAndUpdate(
            { id: params.pizzaId },
            { $pull: { comments: params.commentId }},
            { new: true }
        );
     })
     .then(dbPizzaData => {
         if (!dbPizzaData) {
             res.status(404).json({message: 'No pizza found with this id!'});
             return;
         }
         res.json(dbPizzaData);
     })
     .catch(err => res.json(err));
    }
};

module.exports = commentController;