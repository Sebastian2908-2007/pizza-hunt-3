const {Pizza} = require('../models');

const pizzaController = {
    // get all pizzas
getAllPizza(req,res) {
    Pizza.find({})
    // below will exclude the __v field from our comment data as well as populate the array with more then just id's of comments
    .populate({
        path: 'comments',
        select: '-__v'
    })
    // below will exclude the __v field from our pizza data
    .select('-__v')
    // below will get our pizzas returned in order from newest to oldest
    .sort({_id: -1})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },

  // get one pizza
  getPizzaById({params},res) {
      Pizza.findOne({_id: params.id})
      .populate({
          path: 'comments',
          select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
          // if no pizza data is found send a 404
          if (!dbPizzaData) {
              res.status(404).json({mesage: 'no pizza found with that id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      })
  },
  // create a pizza
  createPizza({body}, res) {
      Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  // update a pizza
  updatePizza({params,body},res) {
      Pizza.findOneAndUpdate({_id: params.id},body,{new: true, runValidators: true})
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'no pizza found with that id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete a pizza 
  deletePizza({params}, res) {
      Pizza.findOneAndDelete({_id: params.id})
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'no pizza found with that id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err =>  res.status(400).json(err));
  }
};

module.exports = pizzaController;