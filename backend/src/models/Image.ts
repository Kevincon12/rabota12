import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true,
    },
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;