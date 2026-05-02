import express from 'express';
import Place from '../models/Place';
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

export default placesRouter;