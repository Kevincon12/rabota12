import express from 'express';
import auth from '../middleware/auth';
import Review from '../models/Review';

const reviewsRouter = express.Router();

reviewsRouter.post('/', auth, async (req, res) => {
    try {
        const user = (req as any).user;

        const {
            place,
            text,
            foodQuality,
            serviceQuality,
            interior,
        } = req.body;

        if (!place || !text) {
            return res.status(400).send({ error: 'Text and place required' });
        }

        const existing = await Review.findOne({
            user: user._id,
            place,
        });

        if (existing) {
            return res.status(400).send({ error: 'You already reviewed this place' });
        }

        const review = new Review({
            user: user._id,
            place,
            text,
            foodQuality,
            serviceQuality,
            interior,
        });

        await review.save();

        res.send(review);
    } catch (e) {
        res.status(400).send({ error: 'Error creating review' });
    }
});

reviewsRouter.delete('/:id', auth, async (req, res) => {
    try {
        const user = (req as any).user;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).send({ error: 'Review not found' });
        }

        if (user.role !== 'admin' && review.user.toString() !== user._id.toString()) {
            return res.status(403).send({ error: 'No access' });
        }

        await review.deleteOne();

        res.send({ message: 'Deleted' });
    } catch (e) {
        res.status(400).send({ error: 'Delete error' });
    }
});

export default reviewsRouter;