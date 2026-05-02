import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongo: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/places-app',
    port: process.env.PORT || 8000,
};

export default config;