import express from 'express';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { email, password, displayName } = req.body;

        if (!email || !password || !displayName) {
            return res.status(400).send({ error: 'All fields required' });
        }

        const user = new User({
            email,
            password,
            displayName,
        });

        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({ error: 'User exists or invalid data' });
    }
});

usersRouter.post('/sessions', async (req, res) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });

    if (!user) {
        return res.status(400).send({ error: 'Email or password is wrong' });
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(400).send({ error: 'Email or password is wrong' });
    }

    user.generateToken();
    await user.save();

    res.send(user);
});

export default usersRouter;