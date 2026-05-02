import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: mongoose.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    foodQuality: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    serviceQuality: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    interior: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;