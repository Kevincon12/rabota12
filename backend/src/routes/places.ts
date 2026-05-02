import express from 'express';
import Place from '../models/Place';
import Review from '../models/Review';
import Image from '../models/Image';
import auth from '../middleware/auth';
import multer from '../middleware/multer';

const placesRouter = express.Router();

placesRouter.get('/', async (_req, res) => {
    const places = await Place.find().populate('user', 'displayName');
    res.send(places);
});

placesRouter.post('/', auth, multer.single('mainImage'), async (req, res) => {
    try {
        const user = (req as any).user;

        const { title, description, agree } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).send({ error: 'All fields required' });
        }

        if (agree !== 'true') {
            return res.status(400).send({ error: 'You must agree to terms' });
        }

        const place = new Place({
            user: user._id,
            title,
            description,
            mainImage: req.file.filename,
        });

        await place.save();

        res.send(place);
    } catch (e) {
        res.status(400).send({ error: 'Error creating place' });
    }
});

placesRouter.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate('user', 'displayName');

        if (!place) {
            return res.status(404).send({ error: 'Place not found' });
        }

        const reviews = await Review.find({ place: place._id })
            .populate('user', 'displayName')
            .sort({ createdAt: -1 });

        const images = await Image.find({ place: place._id });

        let foodAvg = 0;
        let serviceAvg = 0;
        let interiorAvg = 0;
        let overall = 0;

        if (reviews.length > 0) {
            const sumFood = reviews.reduce((acc, r: any) => acc + r.foodQuality, 0);
            const sumService = reviews.reduce((acc, r: any) => acc + r.serviceQuality, 0);
            const sumInterior = reviews.reduce((acc, r: any) => acc + r.interior, 0);

            foodAvg = sumFood / reviews.length;
            serviceAvg = sumService / reviews.length;
            interiorAvg = sumInterior / reviews.length;

            overall = (foodAvg + serviceAvg + interiorAvg) / 3;

            foodAvg = Number(foodAvg.toFixed(1));
            serviceAvg = Number(serviceAvg.toFixed(1));
            interiorAvg = Number(interiorAvg.toFixed(1));
            overall = Number(overall.toFixed(1));
        }

        res.send({
            place,
            reviews,
            images,
            ratings: {
                foodAvg,
                serviceAvg,
                interiorAvg,
                overall,
                reviewsCount: reviews.length,
            },
        });
    } catch (e) {
        res.status(400).send({ error: 'Invalid id' });
    }
});

placesRouter.delete('/:id', auth, async (req, res) => {
    const user = (req as any).user;

    const place = await Place.findById(req.params.id);

    if (!place) {
        return res.status(404).send({ error: 'Not found' });
    }

    if (user.role !== 'admin') {
        return res.status(403).send({ error: 'No access' });
    }

    await place.deleteOne();

    await Review.deleteMany({ place: place._id });
    await Image.deleteMany({ place: place._id });

    res.send({ message: 'Deleted' });
});

export default placesRouter;