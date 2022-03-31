const {Schema,model} = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String 
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    size: {
        type: String,
        default: 'Large'
    },
    // []  indicates Array as the type for the toppings field it could be written toppings: { type: Array }
    toppings: []
});

// create the pizza model using the PizzaSchema
const Pizza = model('Pizza',PizzaSchema);

module.exports = Pizza;