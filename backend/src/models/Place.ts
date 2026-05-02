import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainImage: {
        type: String,
        required: true,
    },
});

const Place = mongoose.model('Place', PlaceSchema);

export default Place;