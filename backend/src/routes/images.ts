import express from 'express';
import auth from '../middleware/auth';
import multer from '../middleware/multer';
import Image from '../models/Image';

const imagesRouter = express.Router();

imagesRouter.post('/', auth, multer.single('image'), async (req, res) => {
    try {
        const user = (req as any).user;
        const { place } = req.body;

        if (!place || !req.file) {
            return res.status(400).send({ error: 'Place and image required' });
        }

        const image = new Image({
            user: user._id,
            place,
            image: req.file.filename,
        });

        await image.save();

        res.send(image);
    } catch (e) {
        res.status(400).send({ error: 'Upload error' });
    }
});

imagesRouter.delete('/:id', auth, async (req, res) => {
    try {
        const user = (req as any).user;

        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).send({ error: 'Image not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).send({ error: 'No access' });
        }

        await image.deleteOne();

        res.send({ message: 'Deleted' });
    } catch (e) {
        res.status(400).send({ error: 'Delete error' });
    }
});

export default imagesRouter;