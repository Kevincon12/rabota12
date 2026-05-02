import mongoose from 'mongoose';
import User from './models/User';
import Place from './models/Place';
import Review from './models/Review';
import Image from './models/Image';

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/places-app');

    await User.deleteMany();
    await Place.deleteMany();
    await Review.deleteMany();
    await Image.deleteMany();

    const admin = new User({
        email: 'admin@test.com',
        password: '123',
        displayName: 'Admin',
        role: 'admin',
    });

    const user1 = new User({
        email: 'user1@test.com',
        password: '123',
        displayName: 'John',
    });

    const user2 = new User({
        email: 'user2@test.com',
        password: '123',
        displayName: 'Sarah',
    });

    await admin.save();
    await user1.save();
    await user2.save();

    const place1 = new Place({
        user: user1._id,
        title: 'Cafe Roma',
        description: 'Nice coffee place',
        mainImage: 'test1.jpg',
    });

    const place2 = new Place({
        user: user2._id,
        title: 'Burger House',
        description: 'Best burgers in town',
        mainImage: 'test2.jpg',
    });

    await place1.save();
    await place2.save();

    const review1 = new Review({
        user: user1._id,
        place: place2._id,
        text: 'Very good!',
        foodQuality: 5,
        serviceQuality: 4,
        interior: 5,
    });

    const review2 = new Review({
        user: user2._id,
        place: place1._id,
        text: 'Nice place',
        foodQuality: 4,
        serviceQuality: 4,
        interior: 4,
    });

    await review1.save();
    await review2.save();

    const image1 = new Image({
        user: user1._id,
        place: place1._id,
        image: 'img1.jpg',
    });

    const image2 = new Image({
        user: user2._id,
        place: place2._id,
        image: 'img2.jpg',
    });

    await image1.save();
    await image2.save();

    console.log('DB seeded');
    process.exit();
};

run();