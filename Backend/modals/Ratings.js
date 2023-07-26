const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
    },  
    comment:{
        type:String,
    }
});

const Ratings = mongoose.model("Ratings", RatingSchema);
module.exports = Ratings;


