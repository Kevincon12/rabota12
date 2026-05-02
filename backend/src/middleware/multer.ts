import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = nanoid() + ext;
        cb(null, name);
    },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;