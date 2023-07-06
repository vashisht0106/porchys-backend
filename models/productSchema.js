const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "prouct name cant not be blank"]
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    images: [{
        public_id: { type: String, required: true },

        url: { type: String, required: true }

    }],
    category: { type: String, required: true },
    Stock: { type: Number, default: 1 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [{
        user: {
            type: String,
            required: true
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true }



    }],
    user: {
        type: String,
        required:true,
        unique: true

    },
    partner: {

        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }



})
module.exports = mongoose.model('product', productSchema)