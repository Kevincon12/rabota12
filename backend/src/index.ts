import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from "./routes/users";
import placesRouter from "./routes/places";
import reviewsRouter from "./routes/reviews";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);

mongoose.connect(config.mongo);

app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});