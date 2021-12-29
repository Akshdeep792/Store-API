const mongoose = require('mongoose')

const productsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'carserra', 'marcos'],
            message: '{value} not supported',

        },
    },
})

const Products = new mongoose.model("Products", productsschema);

module.exports = Products