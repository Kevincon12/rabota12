import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({ error: 'No token' });
    }

    const user = await User.findOne({ token });

    if (!user) {
        return res.status(401).send({ error: 'Wrong token' });
    }

    (req as any).user = user;

    next();
};

export default auth;