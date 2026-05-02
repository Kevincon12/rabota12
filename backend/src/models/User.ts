import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default: () => nanoid(),
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

const User = mongoose.model('User', UserSchema);

export default User;